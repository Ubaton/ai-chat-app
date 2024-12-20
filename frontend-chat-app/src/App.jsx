import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChatInput from "./components/ChatInput";
import ChatResponse from "./components/ChatResponse";
import { toast } from "sonner";
import { fetchChatResponse } from "./lib/api";

function App() {
  const [response, setReponse] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <div className="flex flex-col items-center justify-between min-h-screen bg-zinc-600">
      <div className="">
        <Navbar />
        <ChatResponse response={response} />
      </div>
      <ChatInput onSubmit={handelQuestionSubmit} />
    </div>
  );
}

export default App;
