import React, { useState } from "react";
import Sidebar from "../Sidebar";
import ChatInput from "../ChatInput";
import ChatResponse from "../ChatResponse";
import { toast } from "sonner";
import { fetchChatResponse } from "../../lib/api";
import ProfileIcon from "../ui/ProfileIcon";

function HomePage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleQuestionSubmit = async (question) => {
    // User message
    const userMessage = {
      type: "user",
      content: question,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const apiResponse = await fetchChatResponse(question);
      const aiMessage = {
        type: "ai",
        content: apiResponse,
        timestamp: new Date().toISOString(),
      };
      // AI message response
      setMessages((prev) => [...prev, aiMessage]);

      // Generate chat name based on the first question
      const chatName = `Chat about: ${question}`;
      setChatHistory((prev) => [
        ...prev,
        { name: chatName, messages: [...messages, userMessage, aiMessage] },
      ]);
    } catch (error) {
      toast.error("Failed to get response");
      console.error("Failed to get response", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-800 overflow-y-auto pb-24">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
        chatHistory={chatHistory}
      />
      <ProfileIcon />

      <main
        className={`flex-1 flex flex-col items-center justify-between transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="flex-1 w-full max-w-5xl">
          {messages.map((message, index) => (
            <ChatResponse
              key={message.timestamp}
              response={message.type === "ai" ? message.content : null}
              userInput={message.type === "user" ? message.content : null}
              loading={loading && index === messages.length - 1}
            />
          ))}
        </div>
        <div className="fixed bottom-0 w-full max-w-4xl px-4 mb-4 z-10">
          <ChatInput onSubmit={handleQuestionSubmit} />
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 w-full bg-zinc-800 h-[96px]"></div>
    </div>
  );
}

export default HomePage;
