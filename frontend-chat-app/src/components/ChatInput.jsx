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
            className="p-2 rounded-full w-full px-4 bg-zinc-700 text-white"
            id="question"
            placeholder="Message Lumin"
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
      <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Lumin is an AI assistant and may occasionally provide inaccurate
        information.
      </p>
    </div>
  );
};

export default ChatInput;
