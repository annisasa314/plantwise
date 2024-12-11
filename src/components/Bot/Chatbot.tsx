import React, { useState, useRef, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import {
  arrowDownCircleOutline,
  chatbubbleEllipsesOutline,
  closeCircleOutline,
  leafOutline,
} from "ionicons/icons";
import ChatbotIcon from "./ChatbotIcon";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import { useChatbot } from "./ChatbotProvider";

type ChatMessageType = {
  role: "model" | "user";
  text: string;
};

const Chatbot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { isChatbotOpen, toggleChatbot } = useChatbot();

  const generateBotResponse = async (history: ChatMessageType[]) => {
    const lastMessage = history[history.length - 1]?.text?.toLowerCase() || "";

    const keywords = [
      // Core Themes
      "bercocok tanam",
      "berkebun",
      "tanam",
      "pekarangan",
      "sayuran",
      "tumbuhan",
      "kebun",

      // Platform-Specific Keywords
      "plantwise",
      "edukasi pertanian",
      "pertanian rumahan",
      "ketahanan pangan",

      // Activity-Related
      "menanam",
      "budidaya",
      "pertanian",
      "berkebun pemula",

      // Feature-Related
      "tutorial bertanam",
      "jadwal tanam",
      "forum pertanian",
      "kalkulator tanam",

      // Goal-Oriented
      "pangan segar",
      "ramah lingkungan",
      "sustainable",
      "pertanian berkelanjutan",

      // Technical Aspects
      "jarak tanam",
      "benih",
      "bibit",
      "perawatan tanaman",
      "hama",
      "penyakit tanaman",

      // Contextual
      "rumah",
      "lahan sempit",
      "urban farming",
      "pertanian perkotaan",
    ];

    const isRelevant = keywords.some((keyword) =>
      lastMessage.includes(keyword)
    );

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

    setIsLoading(true);

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers like authorization if needed
      },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Use .json() directly instead of .text() and then parsing
      const data = await response.json();

      // Add more robust checking of the response structure
      if (
        !data ||
        !data.candidates ||
        !data.candidates[0]?.content?.parts?.[0]?.text
      ) {
        throw new Error("Invalid API response structure");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\\(.?)\\*/g, "$1")
        .trim();

      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: apiResponseText },
      ]);
    } catch (error) {
      console.error("API Response Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "model",
          text: "Maaf, terjadi kesalahan dalam memproses permintaan. Silakan coba lagi.",
        },
      ]);
    } finally {
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

  if (!isChatbotOpen) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-full max-w-md"
      style={{ maxWidth: "400px" }}
    >
      <div className="chatbot-popup bg-white shadow-lg rounded-lg">
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
            onClick={toggleChatbot}
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
    </div>
  );
};

export default Chatbot;
