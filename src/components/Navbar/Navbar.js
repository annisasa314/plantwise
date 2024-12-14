import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, } from "@ionic/react";
import { menu } from "ionicons/icons";
import { Navitems } from "../NavItem/NavItem";
export const Navbar = ({ onMenuToggle, isDesktop }) => {
    return (_jsx(IonHeader, { children: _jsxs(IonToolbar, { className: "bg-white shadow-md", children: [!isDesktop && (_jsx(IonButtons, { slot: "start", children: _jsx(IonButton, { onClick: onMenuToggle, children: _jsx(IonIcon, { icon: menu }) }) })), isDesktop ? _jsx(Navitems, {}) : null] }) }));
};
export default Navbar;
