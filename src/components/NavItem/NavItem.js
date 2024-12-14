import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { IonButton, IonButtons, IonIcon, IonToolbar, useIonRouter, } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import Cookies from "js-cookie";
import { auth } from "../../../firebase";
import { ERole } from "../../type/user.type";
import { logout } from "../../services/auth";
export const Navitems = () => {
    const router = useIonRouter();
    const [user, setUser] = useState(null);
    const [activeMenu, setActiveMenu] = useState("Beranda");
    // Menu items configuration
    const menuItems = [
        { label: "Beranda", href: "/" },
        { label: "Panduan", href: "/panduan" },
        { label: "Jadwal", href: "/jadwal" },
        { label: "Kalkulator", href: "/kalkulator" },
        { label: "Forum", href: "/forum" },
    ];
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
    // Logout handler
    const handleLogout = async () => {
        try {
            // Remove all cookies
            Object.keys(Cookies.get()).forEach((cookieName) => {
                Cookies.remove(cookieName, {
                    path: "/",
                    domain: window.location.hostname,
                });
            });
            // Logout from Firebase
            await logout();
            // Clear local storage
            localStorage.clear();
            // Navigate to home page
            router.push("/", "root");
            // Optional: Force page reload to clear any cached state
            window.location.reload();
        }
        catch (error) {
            console.error("Logout failed", error);
        }
    };
    // Navigation handler
    const handleNavigation = (href, label) => {
        setActiveMenu(label);
        router.push(href, "forward", "push");
    };
    return (_jsxs(IonToolbar, { className: "navbar px-16", children: [_jsx(IonButtons, { slot: "start", className: "navbar__logo p-1", children: _jsx("img", { src: "/logo.png", alt: "Plantwise Logo", className: "logo-img w-24 h-auto" }) }), _jsx(IonButtons, { slot: "end", className: "navbarmenu", children: menuItems.map((item, index) => (_jsx(IonButton, { fill: "clear", className: `navbarmenu-item ${activeMenu === item.label ? "active" : ""}`, onClick: () => handleNavigation(item.href, item.label), children: item.label }, index))) }), _jsx(IonButtons, { slot: "end", className: "navbar__actions", children: !user ? (_jsxs(_Fragment, { children: [_jsx(IonButton, { routerLink: "/login", className: "navbar__button mr-2", color: "light", fill: "solid", shape: "round", children: "Masuk" }), _jsx(IonButton, { routerLink: "/signup", className: "navbar__button", color: "primary", fill: "solid", shape: "round", children: "Daftar" })] })) : (_jsxs(IonButton, { fill: "clear", onClick: handleLogout, children: ["Logout", _jsx(IonIcon, { slot: "end", icon: logOutOutline, className: "w-6 h-6 text-green-900 ml-2" })] })) })] }));
};
