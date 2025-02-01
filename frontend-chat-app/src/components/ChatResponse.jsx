import PropTypes from "prop-types";
import { SpinnerOne } from "@mynaui/icons-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import ShinyText from "./ui/ShinyText";

const ChatResponse = ({ response, userInput, loading }) => {
  if (!response && !userInput && !loading) {
    return null;
  }

  let parsedResponse;
  if (response) {
    try {
      parsedResponse =
        typeof response === "string" ? JSON.parse(response) : response;
    } catch (error) {
      console.error("Error parsing response:", error);
      return <div className="container">Error parsing response</div>;
    }
  }

  const responseData = response
    ? Array.isArray(parsedResponse)
      ? parsedResponse[0]
      : parsedResponse
    : null;

  const renderContent = (content) => {
    return content.split(/(```\w*[\s\S]*?```|`.*?`)/g).map((part, i) => {
      // Match code block with or without language
      const codeBlockMatch = part.match(/```(\w+)?\n([\s\S]*?)```/);
      const inlineCodeMatch = part.match(/^`(.*?)`$/);

      if (codeBlockMatch) {
        const language = codeBlockMatch[1] || "plaintext";
        const code = codeBlockMatch[2];
        return (
          <SyntaxHighlighter
            key={i}
            language={language}
            style={solarizedlight}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        );
      } else if (inlineCodeMatch) {
        return (
          <code
            key={i}
            className="bg-gray-200 px-1 py-0.5 rounded text-red-600"
          >
            {inlineCodeMatch[1]}
          </code>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col mt-4 mx-auto max-w-4xl px-4">
      <div className="flex flex-col">
        {userInput && (
          <div className="bg-zinc-700 rounded-2xl shadow-lg p-2 mb-4 max-w-4xl self-end">
            <div className="prose">
              <p className="text-white whitespace-pre-wrap">{userInput}</p>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center self-start space-x-1">
            <SpinnerOne size={24} color="#fff" className="animate-spin" />
            <ShinyText text="Thinking" speed={8} disabled={false} />
          </div>
        )}
        {responseData &&
          responseData.candidates?.map((candidate, index) => (
            <div
              key={index}
              className="bg-zinc-700 rounded-2xl shadow-lg p-6 mb-4 max-w-3xl self-start"
            >
              <div className="prose">
                <p className="text-zinc-50 whitespace-pre-wrap">
                  {renderContent(candidate.content?.parts?.[0]?.text || "")}
                </p>
              </div>
              {responseData?.usageMetadata?.totalTokenCount && (
                <div className="text-right text-zinc-300 text-sm mt-2">
                  Tokens: {responseData.usageMetadata.totalTokenCount}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

ChatResponse.propTypes = {
  response: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  userInput: PropTypes.string,
  loading: PropTypes.bool,
};

export default ChatResponse;
