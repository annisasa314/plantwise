import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef, useEffect, useState } from "react";
import { IonMenu, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon, IonMenuToggle, useIonRouter, } from "@ionic/react";
import { logOutOutline, closeOutline, } from "ionicons/icons";
import Cookies from "js-cookie";
import { auth } from "../../../firebase";
import { ERole } from "../../type/user.type";
import { logout } from "../../services/auth";
export const Sidebar = forwardRef(({ isDesktop }, ref) => {
    const router = useIonRouter();
    const [user, setUser] = useState(null);
    const menuItems = [
        {
            label: "Beranda",
            href: "/",
        },
        {
            label: "Panduan",
            href: "/panduan",
        },
        {
            label: "Jadwal",
            href: "/jadwal",
        },
        {
            label: "Kalkulator",
            href: "/kalkulator",
        },
        {
            label: "Forum",
            href: "/forum",
        },
    ];
    const [activeMenu, setActiveMenu] = useState(() => {
        const currentPath = router.routeInfo?.pathname || "/";
        const matchedItem = menuItems.find((item) => item.href === currentPath);
        return matchedItem ? matchedItem.label : "Beranda";
    });
    // Authentication state listener
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                const userModel = {
                    ...currentUser,
                    id: currentUser.uid,
                    name: currentUser.displayName ?? "",
                    email: currentUser.email ?? "",
                    role: ERole.USER,
                    createdAt: currentUser.metadata.creationTime ?? new Date().toISOString(),
                    updatedAt: currentUser.metadata.lastSignInTime ?? new Date().toISOString(),
                };
                setUser(userModel);
            }
            else {
                setUser(null);
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    // Update active menu when route changes
    useEffect(() => {
        const currentPath = router.routeInfo?.pathname || "/";
        const matchedItem = menuItems.find((item) => item.href === currentPath);
        if (matchedItem) {
            setActiveMenu(matchedItem.label);
        }
    }, [router.routeInfo?.pathname]);
    const handleNavigation = (href, label) => {
        setActiveMenu(label);
        router.push(href, "forward", "push");
        // Pastikan menu ditutup di mode mobile
        if (!isDesktop && ref && "current" in ref && ref.current) {
            ref.current.close();
        }
    };
    const handleLogout = async () => {
        try {
            // Hapus semua cookies
            Object.keys(Cookies.get()).forEach((cookieName) => {
                Cookies.remove(cookieName, {
                    path: "/",
                    domain: window.location.hostname,
                });
            });
            // Logout dari Firebase
            await logout();
            // Bersihkan local storage
            localStorage.clear();
            // Navigasi ke halaman beranda
            router.push("/", "root");
            // Reload halaman untuk membersihkan state
            window.location.reload();
        }
        catch (error) {
            console.error("Logout gagal", error);
        }
    };
    return (_jsxs(IonMenu, { ref: ref, contentId: "main-content", side: "start", type: isDesktop ? "overlay" : "push", className: "sidebar-menu", children: [_jsx(IonHeader, { children: _jsx(IonToolbar, { children: _jsxs(IonButtons, { slot: "start", children: [!isDesktop && (_jsx(IonMenuToggle, { children: _jsx(IonButton, { children: _jsx(IonIcon, { icon: closeOutline }) }) })), _jsx("img", { src: "/logo.png", alt: "Plantwise Logo", className: "w-24 h-auto ml-4" })] }) }) }), _jsx(IonContent, { children: _jsx(IonList, { children: menuItems.map((item, index) => (_jsx(IonItem, { button: true, detail: false, onClick: () => handleNavigation(item.href, item.label), color: activeMenu === item.label ? "primary" : undefined, className: `sidebar-menu-item ${activeMenu === item.label ? "active" : ""}`, children: _jsx(IonLabel, { children: item.label }) }, index))) }) }), _jsx("div", { className: "sidebar-footer p-4", children: !user ? (_jsxs(_Fragment, { children: [_jsx(IonButton, { expand: "block", routerLink: "/login", className: "navbar__button mr-2 mb-2", color: "light", fill: "solid", shape: "round", children: "Masuk" }), _jsx(IonButton, { expand: "block", routerLink: "/signup", className: "navbar__button", color: "primary", fill: "solid", shape: "round", children: "Daftar" })] })) : (_jsxs(IonButton, { expand: "block", fill: "clear", color: "danger", onClick: handleLogout, children: ["Logout", _jsx(IonIcon, { slot: "end", icon: logOutOutline, className: "w-6 h-6 text-green-900 ml-2" })] })) })] }));
});
export default Sidebar;
