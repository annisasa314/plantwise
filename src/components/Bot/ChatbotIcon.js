import { jsx as _jsx } from "react/jsx-runtime";
import { IonIcon } from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import { useChatbot } from "./ChatbotProvider";
const ChatbotFloatingIcon = () => {
    const { isChatbotOpen, toggleChatbot } = useChatbot();
    if (isChatbotOpen)
        return null; // Sembunyikan ikon jika chatbot terbuka
    return (_jsx("button", { onClick: toggleChatbot, className: "fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all", children: _jsx(IonIcon, { icon: chatbubbleEllipsesOutline, className: "text-2xl text-center" }) }));
};
export default ChatbotFloatingIcon;
