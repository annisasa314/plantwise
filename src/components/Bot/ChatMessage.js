import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChatbotIcon from "./ChatbotIcon";
const ChatMessage = ({ chat }) => {
    // Function to clean and format markdown
    const formatText = (text) => {
        // Remove markdown formatting
        let cleanedText = text
            .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
            .replace(/\*(.*?)\*/g, "$1") // Remove italic markers
            .replace(/__(.*?)__/g, "$1") // Remove alternative bold markers
            .replace(/_(.*?)_/g, "$1"); // Remove alternative italic markers
        // Split text into paragraphs
        const paragraphs = cleanedText.split("\n").filter((p) => p.trim() !== "");
        return (_jsx("div", { className: "text-wrap", children: paragraphs.map((paragraph, index) => (_jsx("p", { className: "mb-2 text-gray-800 leading-relaxed", children: paragraph }, index))) }));
    };
    // Styling for different message types
    if (chat.role === "model") {
        return (_jsxs("div", { className: "message bot-message flex items-start space-x-3 mb-4", children: [_jsx(ChatbotIcon, {}), _jsx("div", { className: "bg-blue-100 p-3 rounded-lg max-w-[80%]", children: formatText(chat.text) })] }));
    }
    // User message styling
    return (_jsx("div", { className: "message user-message flex justify-end mb-4", children: _jsx("div", { className: "bg-green-100 p-3 rounded-lg max-w-[80%]", children: _jsx("p", { className: "text-gray-800", children: chat.text }) }) }));
};
export default ChatMessage;
