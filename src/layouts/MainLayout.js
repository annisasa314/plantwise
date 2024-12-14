import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Navbar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { useMediaQuery } from "../hooks/useMediaQuery";
export const MainLayout = ({ children }) => {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const sidebarRef = useRef(null);
    const handleMenuToggle = () => {
        if (sidebarRef.current) {
            sidebarRef.current.toggle();
        }
    };
    return (_jsxs(IonPage, { children: [!isDesktop && _jsx(Sidebar, { ref: sidebarRef, isDesktop: false }), _jsx(Navbar, { onMenuToggle: handleMenuToggle, isDesktop: isDesktop }), _jsx(IonContent, { id: "main-content", children: children })] }));
};
