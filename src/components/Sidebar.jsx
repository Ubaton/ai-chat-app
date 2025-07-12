import {
  ClockCircle,
  PanelLeftClose,
  PanelRightClose,
  EditOne,
  Star,
  Plus,
  ChatMessages,
} from "@mynaui/icons-react";
import { useState } from "react";
import PropTypes from "prop-types";
import LuminLogo from "../../public/Lumin.png";
import { Link } from "@tanstack/react-router";

const Sidebar = ({ isOpen, onToggle, chatHistory }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const menuItems = [
    {
      title: "History",
      icon: <ClockCircle size={20} />,
      action: () => setIsHistoryOpen(!isHistoryOpen),
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-40 flex">
      <div
        className={`h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                  <img src={LuminLogo} alt="Lumin Logo" className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Lumin AI</h2>
                  <p className="text-xs text-slate-400">Assistant</p>
                </div>
              </div>
            )}
            <button
              onClick={() => onToggle(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-800/60 transition-colors text-slate-400 hover:text-white"
            >
              {isOpen ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelRightClose size={20} />
              )}
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            className={`w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-white font-medium ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <Plus size={20} />
            {isOpen && <span>New Chat</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={item.action}
                  className={`w-full flex items-center p-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200 ${
                    isOpen ? "justify-start" : "justify-center"
                  } ${isHistoryOpen ? "bg-slate-800/40 text-white" : ""}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isOpen && <span className="ml-3 text-sm">{item.title}</span>}
                </button>

                {/* Chat History */}
                {isHistoryOpen && isOpen && (
                  <div className="mt-2 space-y-1 max-h-96 overflow-y-auto">
                    {chatHistory.length > 0 ? (
                      chatHistory.map((chat, index) => (
                        <div
                          key={index}
                          className="p-3 ml-3 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <ChatMessages
                              size={16}
                              className="text-slate-500 group-hover:text-slate-400"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-slate-300 group-hover:text-white truncate">
                                {typeof chat.name === "string"
                                  ? chat.name
                                  : "Chat"}
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                {chat.messages?.length || 0} messages
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 ml-3 text-sm text-slate-500 text-center">
                        No chat history yet
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <Link to="/plan">
            <button
              className={`w-full flex items-center p-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Star className="text-yellow-500" size={20} />
              {isOpen && (
                <div className="ml-3 flex-1 text-left">
                  <div className="text-sm font-medium text-white">
                    Free Plan
                  </div>
                  <div className="text-xs text-slate-500">
                    Unlimited conversations
                  </div>
                </div>
              )}
            </button>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => onToggle(false)}
        />
      )}

      {/* New Chat Floating Button (when collapsed) */}
      {!isOpen && (
        <div className="mt-4 ml-2">
          <button className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            <EditOne color="#fff" size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  chatHistory: PropTypes.array.isRequired,
};
export default Sidebar;
