import React from "react";

const ChatResponse = ({ response }) => {
  if (!response) {
    return null;
  }

  let parsedResponse;
  try {
    parsedResponse =
      typeof response === "string" ? JSON.parse(response) : response;
  } catch (error) {
    console.error("Error parsing response:", error);
    return <div className="container">Error parsing response</div>;
  }

  // Handle array response
  const responseData = Array.isArray(parsedResponse)
    ? parsedResponse[0]
    : parsedResponse;

  return (
    <div className="container mt-20 mx-auto max-w-5xl p-4">
      {responseData.candidates?.map((candidate, index) => (
        <div
          key={index}
          className="bg-zinc-600 rounded-lg shadow-lg p-6 mb-4 max-w-5xl mx-auto"
        >
          <div className="prose">
            <p className="text-zinc-50 whitespace-pre-wrap">
              {candidate.content?.parts?.[0]?.text}
            </p>
          </div>
        </div>
      ))}
      {responseData.usageMetadata?.totalTokenCount && (
        <div className="text-right text-zinc-300 text-sm mt-2">
          Tokens: {responseData.usageMetadata.totalTokenCount}
        </div>
      )}
    </div>
  );
};

export default ChatResponse;
