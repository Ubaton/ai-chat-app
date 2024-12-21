import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";
import ChatResponse from "./components/ChatResponse";
import { toast } from "sonner";
import { fetchChatResponse } from "./lib/api";

function App() {
  const [response, setReponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handelQuestionSubmit = async (question) => {
    setLoading(true);
    setReponse(null);
    try {
      const apiResponse = await fetchChatResponse(question);
      setReponse(apiResponse);
    } catch (error) {
      toast.error("Failed to get response");
      console.error("Failed to get response", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-700">
      <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
      <main
        className={`flex-1 flex flex-col items-center justify-between transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="flex-1">
          <ChatResponse response={response} />
        </div>
        <div className="w-full max-w-4xl px-4 mb-4">
          <ChatInput onSubmit={handelQuestionSubmit} />
        </div>
      </main>
    </div>
  );
}

export default App;
