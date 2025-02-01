import PropTypes from "prop-types";
import { SpinnerOne, Copy } from "@mynaui/icons-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import ShinyText from "./ui/ShinyText";
import { useState } from "react";

const CopyableText = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded bg-zinc-700 hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100"
        title="Copy code"
      >
        <Copy size={16} color="#fff" />
      </button>
      {copied && (
        <span className="absolute top-2 right-10 bg-zinc-700 text-white text-sm px-2 py-1 rounded">
          Copied!
        </span>
      )}
      {text}
    </div>
  );
};

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <SyntaxHighlighter
        language={language}
        style={solarizedlight}
        showLineNumbers
        customStyle={{ backgroundColor: "#2d3748", color: "#fff" }}
        className="bg-zinc-600 rounded-lg"
      >
        {code}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded bg-zinc-700 hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100"
        title="Copy code"
      >
        <Copy size={16} color="#fff" />
      </button>
      {copied && (
        <span className="absolute top-2 right-10 bg-zinc-700 text-white text-sm px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </div>
  );
};

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
        return <CodeBlock key={i} code={code} language={language} />;
      } else if (inlineCodeMatch) {
        return (
          <div className="inline-block" key={i}>
            <CopyableText
              text={
                <code className="bg-zinc-600 px-1 py-0.5 rounded text-white">
                  {inlineCodeMatch[1]}
                </code>
              }
            />
          </div>
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

CopyableText.propTypes = {
  text: PropTypes.node.isRequired,
};

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
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
