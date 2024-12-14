import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { sendOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
const ChatForm = ({ chatHistory, setChatHistory, generateBotRespone, isLoading = false, }) => {
    const [userInput, setUserInput] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedInput = userInput.trim();
        if (!trimmedInput || isLoading)
            return;
        const newUserMessage = {
            role: "user",
            text: trimmedInput,
        };
        const updatedHistory = [...chatHistory, newUserMessage];
        setChatHistory(updatedHistory);
        setUserInput("");
        await generateBotRespone(updatedHistory);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex items-center space-x-2 bg-gray-50 p-1 rounded-xl border border-gray-200", children: [_jsx("input", { type: "text", value: userInput, onChange: (e) => setUserInput(e.target.value), placeholder: "Tanya tentang berkebun...", className: "flex-grow p-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500", disabled: isLoading }), _jsx("button", { type: "submit", className: `
          p-2 rounded-lg 
          transition-colors duration-200 
          ${isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600 active:bg-green-700"}
        `, disabled: isLoading, children: isLoading ? (_jsxs("span", { className: "flex items-center", children: [_jsxs("svg", { className: "animate-spin h-5 w-5 mr-2", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Menunggu..."] })) : (_jsx(IonIcon, { icon: sendOutline, className: "text-xl" })) })] }));
};
export default ChatForm;
