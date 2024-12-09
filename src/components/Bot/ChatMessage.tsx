import React from "react";
import ChatbotIcon from "./ChatbotIcon";

type ChatMessageType = {
  role: "model" | "user";
  text: string;
};

interface ChatMessageProps {
  chat: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  // Function to clean and format markdown
  const formatText = (text: string) => {
    // Remove markdown formatting
    let cleanedText = text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
      .replace(/\*(.*?)\*/g, "$1") // Remove italic markers
      .replace(/__(.*?)__/g, "$1") // Remove alternative bold markers
      .replace(/_(.*?)_/g, "$1"); // Remove alternative italic markers

    // Split text into paragraphs
    const paragraphs = cleanedText.split("\n").filter((p) => p.trim() !== "");

    return (
      <div className="text-wrap">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-2 text-gray-800 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    );
  };

  // Styling for different message types
  if (chat.role === "model") {
    return (
      <div className="message bot-message flex items-start space-x-3 mb-4">
        <ChatbotIcon />
        <div className="bg-blue-100 p-3 rounded-lg max-w-[80%]">
          {formatText(chat.text)}
        </div>
      </div>
    );
  }

  // User message styling
  return (
    <div className="message user-message flex justify-end mb-4">
      <div className="bg-green-100 p-3 rounded-lg max-w-[80%]">
        <p className="text-gray-800">{chat.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
