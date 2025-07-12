import { useState } from "react";
import Sidebar from "../Sidebar";
import ChatInput from "../ChatInput";
import ChatResponse from "../ChatResponse";
import { toast } from "sonner";
import { fetchChatResponse } from "../../lib/api";
import ProfileIcon from "../ui/ProfileIcon";
import {
  ChatMessages,
  Sparkles,
  FileText,
  Code,
  Chat,
  Activity,
  Shield,
} from "@mynaui/icons-react";
import LuminLog from "../../../public/Lumin.png";

function HomePage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleQuestionSubmit = async (question) => {
    const userMessage = {
      type: "user",
      content: question,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const apiResponse = await fetchChatResponse(question);
      const aiMessage = {
        type: "ai",
        content: apiResponse,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      const chatName = (
        <span className="flex items-center justify-center gap-2">
          <ChatMessages className="inline-block mr-1" />
          {`${question}`}
        </span>
      );
      setChatHistory((prev) => [
        ...prev,
        { name: chatName, messages: [...messages, userMessage, aiMessage] },
      ]);
    } catch (error) {
      toast.error("Failed to get response");
      console.error("Failed to get response", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSamplePrompt = (prompt) => {
    handleQuestionSubmit(prompt);
  };

  const samplePrompts = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Code Generation",
      description: "Generate clean, efficient code in any programming language",
      prompt: "Help me create a REST API endpoint for user authentication",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Document Analysis",
      description: "Analyze and summarize complex documents and reports",
      prompt:
        "Help me analyze this quarterly business report and extract key insights",
    },
    {
      icon: <Chat className="w-5 h-5" />,
      title: "Strategic Planning",
      description: "Get assistance with business strategy and decision making",
      prompt: "Help me develop a go-to-market strategy for a new SaaS product",
    },
  ];

  const isEmptyState = messages.length === 0;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
        chatHistory={chatHistory}
      />

      {/* Header */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <img src={LuminLog} alt="Lumin Logo" className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Lumin AI</h1>
              <p className="text-sm text-slate-400">Enterprise AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <ProfileIcon />
          </div>
        </div>
      </header>

      <main
        className={`flex-1 flex flex-col transition-all duration-300 pt-20 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {isEmptyState ? (
          /* Empty State - Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="text-center max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white">
                    Welcome to Lumin AI
                  </h2>
                </div>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Your enterprise-grade AI assistant designed to boost
                  productivity, streamline workflows, and provide intelligent
                  insights for your business needs.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {samplePrompts.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSamplePrompt(item.prompt)}
                    className="group p-6 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-blue-400 group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  Enterprise Security
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-yellow-400" />
                  High Performance
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  99.9% Uptime
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message, index) => (
                  <ChatResponse
                    key={message.timestamp}
                    response={message.type === "ai" ? message.content : null}
                    userInput={message.type === "user" ? message.content : null}
                    loading={loading && index === messages.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-700/50 bg-slate-800/80 backdrop-blur-md">
              <div className="max-w-4xl mx-auto px-6 py-4">
                <ChatInput onSubmit={handleQuestionSubmit} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
