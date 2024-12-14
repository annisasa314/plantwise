import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonFooter, IonGrid, IonRow, IonCol } from "@ionic/react";
import "./Footer.css";
const Footer = () => {
    return (_jsx(IonFooter, { className: "footer bg-green-900", children: _jsx(IonGrid, { className: "footer-container", children: _jsxs(IonRow, { className: "footer-row", children: [_jsxs(IonCol, { sizeMd: "4", sizeSm: "12", className: "footer-brand", children: [_jsx("div", { className: "logo", children: _jsx("img", { src: "/logo2.png", alt: "Plantwise Logo", className: "logo-img-footer" }) }), _jsx("p", { className: "copyright", children: "\u00A92024 plantwise. Semua Hak Dilindungi." })] }), _jsx(IonCol, { sizeMd: "4", sizeSm: "6", className: "footer-links", children: _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { href: "#", children: "Beranda" }) }), _jsx("li", { children: _jsx("a", { href: "", children: "Daftar / Masuk" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Tentang Kami" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Syarat & Ketentuan" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Kebijakan Privasi" }) })] }) }), _jsxs(IonCol, { sizeMd: "4", sizeSm: "6", className: "footer-socials", children: [_jsx("a", { href: "#", children: _jsx("i", { className: "fab fa-facebook" }) }), _jsx("a", { href: "#", children: _jsx("i", { className: "fab fa-instagram" }) }), _jsx("a", { href: "#", children: _jsx("i", { className: "fab fa-linkedin" }) }), _jsx("a", { href: "#", children: _jsx("i", { className: "fab fa-tiktok" }) }), _jsx("a", { href: "#", children: _jsx("i", { className: "fab fa-youtube" }) })] })] }) }) }));
};
export default Footer;
