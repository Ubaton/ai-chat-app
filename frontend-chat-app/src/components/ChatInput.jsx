import React, { useState } from "react";
import { Send } from "@mynaui/icons-react";

const ChatInput = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion("");
    }
  };

  return (
    <div className="container my-4 w-full">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="w-full">
          <input
            type="text"
            className="p-2 rounded-full w-full px-4"
            id="question"
            placeholder="Enter your prompt"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-violet-600 p-2 rounded-full"
        >
          <Send size={25} color="#fff" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
