import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Send } from "@mynaui/icons-react";
import SettingsContext from "../context/SettingsContext";

const ChatInput = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const { settings } = useContext(SettingsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion("");
    }
  };

  const fontSize =
    {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    }[settings.personalization.fontSize] || "text-base";

  return (
    <div className="container my-4 w-full">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="w-full">
          <input
            type="text"
            className={`p-2 rounded-full w-full px-4 bg-zinc-700 text-white ${fontSize}`}
            id="question"
            placeholder={`Message ${settings.personalization.assistantName}`}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-violet-600 p-2 rounded-full hover:bg-violet-700 transition-colors"
        >
          <Send size={25} color="#fff" />
        </button>
      </form>
      <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
        {settings.personalization.assistantName} is an AI assistant and may
        occasionally provide inaccurate information.
      </p>
    </div>
  );
};

ChatInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChatInput;
