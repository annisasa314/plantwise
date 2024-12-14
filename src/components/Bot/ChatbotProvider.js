import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useContext } from "react";
const ChatbotContext = createContext(undefined);
export const ChatbotProvider = ({ children, }) => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const openChatbot = () => setIsChatbotOpen(true);
    const closeChatbot = () => setIsChatbotOpen(false);
    const toggleChatbot = () => setIsChatbotOpen((prev) => !prev);
    return (_jsx(ChatbotContext.Provider, { value: {
            isChatbotOpen,
            openChatbot,
            closeChatbot,
            toggleChatbot,
        }, children: children }));
};
export const useChatbot = () => {
    const context = useContext(ChatbotContext);
    if (!context) {
        throw new Error("useChatbot must be used within a ChatbotProvider");
    }
    return context;
};
