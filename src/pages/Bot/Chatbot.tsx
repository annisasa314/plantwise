import React, { useState, useRef, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { arrowDownCircleOutline, closeCircleOutline } from "ionicons/icons";
import ChatbotIcon from "../../components/Bot/ChatbotIcon";
import ChatMessage from "../../components/Bot/ChatMessage";
import ChatForm from "../../components/Bot/ChatForm";

type ChatMessageType = {
  role: "model" | "user";
  text: string;
};

const Chatbot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = async (history: ChatMessageType[]) => {
    const lastMessage = history[history.length - 1]?.text?.toLowerCase();

    // Filter to ensure the question is related to gardening
    const isRelevant =
      lastMessage.includes("bercocok tanam") ||
      lastMessage.includes("berkebun") ||
      lastMessage.includes("tanam") ||
      lastMessage.includes("pekarangan") ||
      lastMessage.includes("sayuran") ||
      lastMessage.includes("tumbuhan") ||
      lastMessage.includes("kebun");

    if (!isRelevant) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "model",
          text: "Maaf, silakan tanyakan hal yang terkait dengan berkebun atau bercocok tanam di pekarangan.",
        },
      ]);
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Format chat history for API request
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      // Make the API call to get the bot's response
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong!");

      // Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\\(.?)\\*/g, "$1")
        .trim();

      // Update history and clear loading state
      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: apiResponseText },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "model",
          text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
        },
      ]);
      setIsLoading(false);
    }
  };

  // Scroll to the bottom of the chat body whenever chat history is updated
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory, isLoading]);

  return (
    <div
      className={`container mx-auto p-4 ${showChatbot ? "show-chatbot" : ""}`}
    >
      {/* Button to toggle chatbot visibility */}
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
        className="toggle-button"
      >
        <IonIcon
          icon={showChatbot ? closeCircleOutline : arrowDownCircleOutline}
          className="text-gray-600 text-3xl"
        />
      </button>

      {/* Chatbot Popup */}
      {showChatbot && (
        <div className="chatbot-popup bg-white shadow-lg rounded-lg max-w-lg mx-auto">
          {/* Chatbot Header */}
          <div className="chat-header flex justify-between items-center p-4 border-b">
            <div className="header-info flex items-center space-x-2">
              <ChatbotIcon />
              <h2 className="logo-text text-xl font-semibold text-gray-800">
                Chatbot Berkebun
              </h2>
            </div>
            <IonIcon
              icon={arrowDownCircleOutline}
              className="text-gray-600 text-2xl cursor-pointer"
              onClick={() => setShowChatbot((prev) => !prev)}
            />
          </div>

          {/* Chatbot Body */}
          <div
            ref={chatBodyRef}
            className="chat-body p-4 h-80 overflow-y-scroll space-y-4"
          >
            {/* Default Message */}
            <div className="message bot-message flex items-start space-x-3">
              <ChatbotIcon />
              <p className="message-text text-gray-800 bg-blue-100 p-2 rounded-lg">
                Halo! Mau konsultasi tentang berkebun di pekarangan?
              </p>
            </div>

            {/* Render Chat History */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="message bot-message flex items-start space-x-3">
                <ChatbotIcon />
                <p className="message-text text-gray-800 bg-blue-100 p-2 rounded-lg">
                  Sedang memikirkan jawaban...
                </p>
              </div>
            )}
          </div>

          {/* Chatbot Footer */}
          <div className="chat-footer p-4 border-t">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotRespone={generateBotResponse}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
