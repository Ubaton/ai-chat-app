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
    setReponse(null);
    setLoading(true); // Set loading to true when fetching starts
    try {
      const apiResponse = await fetchChatResponse(question);
      setReponse(apiResponse);
    } catch (error) {
      toast.error("Failed to get response");
      console.error("Failed to get response", error);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
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
          <ChatResponse response={response} loading={loading} />{" "}
          {/* Pass loading state to ChatResponse */}
        </div>
        <div className="fixed bottom-0 w-full max-w-4xl px-4 mb-4 z-10">
          <ChatInput onSubmit={handelQuestionSubmit} />
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 w-full bg-zinc-700 h-[96px]"></div>
    </div>
  );
}

export default App;
