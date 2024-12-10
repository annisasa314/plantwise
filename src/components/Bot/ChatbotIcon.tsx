import React from "react";
import { IonIcon } from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import { useChatbot } from "./ChatbotProvider";

const ChatbotFloatingIcon: React.FC = () => {
  const { isChatbotOpen, toggleChatbot } = useChatbot();

  if (isChatbotOpen) return null; // Sembunyikan ikon jika chatbot terbuka

  return (
    <button
      onClick={toggleChatbot}
      className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
    >
      <IonIcon
        icon={chatbubbleEllipsesOutline}
        className="text-2xl text-center"
      />
    </button>
  );
};

export default ChatbotFloatingIcon;
