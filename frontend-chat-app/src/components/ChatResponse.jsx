import React from "react";
import { SpinnerOne } from "@mynaui/icons-react";

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
          <div className="self-start flex items-center justify-center">
            <SpinnerOne size={24} color="#fff" className="animate-spin" />
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
                  {candidate.content?.parts?.[0]?.text
                    .split(/(\*\*.*?\*\*)/g)
                    .map((part, i) =>
                      part.match(/^\*\*.*\*\*$/) ? (
                        <strong key={i}>{part.replace(/\*\*/g, "")}</strong>
                      ) : (
                        part
                      )
                    )}
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

export default ChatResponse;
