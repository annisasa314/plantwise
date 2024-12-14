import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IonIcon } from "@ionic/react";
import { bookOutline, calendarOutline, chatboxOutline, documentTextOutline, homeOutline, logOutOutline, personOutline, } from "ionicons/icons";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../services/auth"; // Adjust import path as needed
export const AdminSidebar = ({ isOpen, toggleSidebar }) => {
    const [isForumDropdownOpen, setIsForumDropdownOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const history = useHistory();
    const handleLogout = async () => {
        try {
            // Remove all cookies
            Object.keys(Cookies.get()).forEach((cookieName) => {
                Cookies.remove(cookieName, {
                    path: "/",
                    domain: window.location.hostname,
                });
            });
            // Perform logout
            await logout();
            // Clear local storage
            localStorage.clear();
            // Redirect to admin login page
            history.push("/admin");
            // Optional: Force page reload to clear any cached state
            window.location.reload();
        }
        catch (error) {
            console.error("Logout failed", error);
            // Optionally show an error toast or message
        }
    };
    return (_jsx("aside", { className: `bg-[#3e885b] text-white h-full fixed left-0 top-0 bottom-0 z-50 
        transition-all duration-300 shadow-lg
        ${isOpen ? "w-64" : "w-20"} overflow-hidden`, children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between p-4", children: [isOpen && (_jsx("h2", { className: "text-xl font-bold text-white", children: "Admin Panel" })), _jsx("button", { onClick: toggleSidebar, className: "p-2 rounded hover:bg-[#2f4b26] transition", children: _jsx(IonIcon, { icon: documentTextOutline, className: "w-6 h-6 text-white" }) })] }), _jsx("nav", { className: "flex-1 py-4", children: _jsxs("ul", { children: [_jsx(Link, { to: "/admin/dashboard", children: _jsxs("li", { onClick: () => setActiveMenu("dashboard"), className: `px-4 py-2 flex items-center cursor-pointer transition 
              ${isOpen ? "justify-start" : "justify-center"}
              ${activeMenu === "dashboard"
                                        ? "bg-[#2f4b26]"
                                        : "hover:bg-[#2f4b26]"}`, children: [_jsx(IonIcon, { icon: homeOutline, className: "w-6 h-6 mr-3 text-white" }), isOpen && _jsx("span", { className: "text-white", children: "Dashboard" })] }) }), _jsx(Link, { to: "/admin/panduan", children: _jsxs("li", { onClick: () => setActiveMenu("panduan"), className: `px-4 py-2 flex items-center cursor-pointer transition
              ${isOpen ? "justify-start" : "justify-center"}
              ${activeMenu === "panduan" ? "bg-[#2f4b26]" : "hover:bg-[#2f4b26]"}`, children: [_jsx(IonIcon, { icon: bookOutline, className: "w-6 h-6 mr-3 text-white" }), isOpen && _jsx("span", { className: "text-white", children: "Panduan" })] }) }), _jsx(Link, { to: "/admin/jadwal", children: _jsxs("li", { onClick: () => setActiveMenu("jadwal"), className: `px-4 py-2 flex items-center cursor-pointer transition
              ${isOpen ? "justify-start" : "justify-center"}
              ${activeMenu === "jadwal" ? "bg-[#2f4b26]" : "hover:bg-[#2f4b26]"}`, children: [_jsx(IonIcon, { icon: calendarOutline, className: "w-6 h-6 mr-3 text-white" }), isOpen && _jsx("span", { className: "text-white", children: "Jadwal" })] }) }), _jsx(Link, { to: "/admin/user", children: _jsxs("li", { onClick: () => setActiveMenu("user"), className: `px-4 py-2 flex items-center cursor-pointer transition
              ${isOpen ? "justify-start" : "justify-center"}
              ${activeMenu === "user" ? "bg-[#2f4b26]" : "hover:bg-[#2f4b26]"}`, children: [_jsx(IonIcon, { icon: personOutline, className: "w-6 h-6 mr-3 text-white" }), isOpen && _jsx("span", { className: "text-white", children: "User" })] }) }), _jsxs("li", { children: [_jsxs("div", { onClick: () => {
                                            setIsForumDropdownOpen(!isForumDropdownOpen);
                                            setActiveMenu("forum");
                                        }, className: `px-4 py-2 flex items-center cursor-pointer transition
              ${isOpen ? "justify-start" : "justify-center"}
              ${activeMenu === "forum" ? "bg-[#3e885b]" : "hover:bg-[#2f4b26]"}`, children: [_jsx(IonIcon, { icon: chatboxOutline, className: "w-6 h-6 mr-3 text-white" }), isOpen && (_jsxs(_Fragment, { children: [_jsx("span", { className: "flex-1 text-white", children: "Forum" }), _jsx("span", { className: `transform transition-transform text-white
                  ${isForumDropdownOpen ? "rotate-180" : ""}`, children: "\u25BC" })] }))] }), isOpen && isForumDropdownOpen && (_jsxs("ul", { className: "bg-[#3e885b] py-2", children: [_jsx(Link, { to: "/admin/forum/post", children: _jsx("li", { onClick: () => setActiveMenu("post"), className: `px-8 py-2 text-white cursor-pointer 
                    ${activeMenu === "post"
                                                        ? "bg-[#2f4b26]"
                                                        : "hover:bg-[#2f4b26]"}`, children: "Post" }) }), _jsx(Link, { to: "/admin/forum/komentar", children: _jsx("li", { onClick: () => setActiveMenu("komentar"), className: `px-8 py-2 text-white cursor-pointer 
                    ${activeMenu === "komentar"
                                                        ? "bg-[#2f4b26]"
                                                        : "hover:bg-[#2f4b26]"}`, children: "Komentar" }) })] }))] })] }) }), _jsx("div", { className: "border-t border-white/20", children: _jsxs("li", { onClick: handleLogout, className: `px-4 py-3 flex items-center cursor-pointer transition 
            ${isOpen ? "justify-start" : "justify-center"}
            hover:bg-[#2f4b26]`, children: [_jsx(IonIcon, { icon: logOutOutline, className: "w-6 h-6 mr-3 text-white" }), isOpen && _jsx("span", { className: "text-white", children: "Logout" })] }) })] }) }));
};
export default AdminSidebar;
