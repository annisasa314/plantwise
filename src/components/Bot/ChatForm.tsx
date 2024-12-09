import React, { useState } from "react";
import { ChatFormProps, ChatMessageType } from "../../types/chatMessage.type"; // Adjust the import path as needed

const ChatForm: React.FC<ChatFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotRespone,
  isLoading = false, // Default to false if not provided
}) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim the input and check if it's not empty
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message to chat history
    const newUserMessage: ChatMessageType = {
      role: "user",
      text: trimmedInput,
    };

    // Update chat history with user message
    const updatedHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedHistory);

    // Clear input field
    setUserInput("");

    // Generate bot response
    await generateBotRespone(updatedHistory);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Tanya tentang berkebun..."
        className="flex-grow p-2 border rounded-lg"
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`p-2 rounded-lg ${
          isLoading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Menunggu..." : "Kirim"}
      </button>
    </form>
  );
};

export default ChatForm;
