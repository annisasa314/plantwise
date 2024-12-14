import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonContent, IonGrid } from "@ionic/react";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/Hero/Hero";
import { MainLayout } from "../../layouts/MainLayout";
import About from "../../components/About/About";
import VisionMission from "../../components/Misi/Misi";
import TutorialGrid from "../../components/Fitur/Fitur";
const Home = () => {
    return (_jsx(MainLayout, { children: _jsx(IonContent, { children: _jsxs("section", { children: [_jsx(HeroSection, {}), _jsx(IonGrid, { className: "focus-content", children: _jsxs("section", { children: [_jsx(About, {}), _jsx("section", { style: { marginTop: "40px" }, children: _jsx(VisionMission, {}) }), _jsx("section", { style: {
                                        marginTop: "80px",
                                        marginBottom: "10px",
                                    }, children: _jsx(TutorialGrid, {}) })] }) }), _jsx(Footer, {})] }) }) }));
};
export default Home;
