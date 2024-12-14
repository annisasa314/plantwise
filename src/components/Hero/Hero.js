import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonText } from "@ionic/react";
const HeroSection = () => {
    return (_jsxs("div", { className: "relative w-full h-screen bg-center bg-cover", style: { backgroundImage: "url('/hero-img.jpg')" }, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-green-500 to-transparent" }), _jsx("div", { className: "relative flex items-center justify-left pl-24 h-full", children: _jsxs(IonText, { className: "text-white font-semibold text-4xl text-left", children: [_jsx("p", { children: "Tentang kami " }), _jsx("br", {}), _jsx("p", { children: "p l a n t w i s e" })] }) })] }));
};
export default HeroSection;
