import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, useIonRouter, } from "@ionic/react";
const TutorialCard = ({ title, content, navigateTo, icon, }) => {
    const { push } = useIonRouter();
    const handleNavigation = () => {
        push(navigateTo);
    };
    return (_jsxs(IonCard, { onClick: handleNavigation, className: "cursor-pointer hover:translate-y-2 duration-200 bg-white border rounded-lg p-4 max-w-l max-h-80" // Tambahkan max-w-xs dan h-72
        , children: [_jsxs(IonCardHeader, { className: "flex items-center gap-4", children: [_jsx(IonIcon, { icon: icon, className: "text-4xl text-green-700" }), _jsx(IonCardTitle, { className: "text-xl font-semibold text-green-900", children: title })] }), _jsxs(IonCardContent, { className: "text-gray-600 text-justify", children: [_jsx("p", { className: "leading-relaxed p-2 mb-4", children: content }), _jsx(IonButton, { size: "small", className: "flex items-center p-2 gap-2 hover:translate-y-1 duration-200", children: "Lihat detail" })] })] }));
};
export default TutorialCard;
