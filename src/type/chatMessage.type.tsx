import { Dispatch, SetStateAction } from "react";

// Define the type for chat messages
export type ChatMessageType = {
  role: "model" | "user";
  text: string;
};

// Updated ChatForm props type to include isLoading
export interface ChatFormProps {
  chatHistory: ChatMessageType[];
  setChatHistory: Dispatch<SetStateAction<ChatMessageType[]>>;
  generateBotRespone: (history: ChatMessageType[]) => Promise<void>;
  isLoading?: boolean; // Make it optional with '?'
}
