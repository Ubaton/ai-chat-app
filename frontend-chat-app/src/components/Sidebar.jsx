import {
  ClockCircle,
  Logout,
  PanelLeftClose,
  PanelRightClose,
} from "@mynaui/icons-react";
import React, { useState } from "react";
import LuminLogo from "../assets/Lumin.svg";

const Sidebar = ({ isOpen, onToggle }) => {
  // Dummy chat history data
  const [history] = useState([
    {
      id: 1,
      title: "Project Discussion",
      date: "Today, 2:30 PM",
      preview: "Discussion about the new features...",
    },
    {
      id: 2,
      title: "Bug Report Analysis",
      date: "Today, 11:20 AM",
      preview: "Investigating the login issue...",
    },
    {
      id: 3,
      title: "Team Meeting Notes",
      date: "Yesterday, 4:15 PM",
      preview: "Weekly sprint planning discussion...",
    },
    {
      id: 4,
      title: "Client Feedback",
      date: "Yesterday, 10:00 AM",
      preview: "Review of the latest deployment...",
    },
  ]);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const menuItems = [
    {
      title: "History",
      icon: <ClockCircle size={24} />,
      action: () => setIsHistoryOpen(!isHistoryOpen),
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 flex">
      <div
        className={`
          h-screen bg-white dark:bg-zinc-900 transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
          flex flex-col justify-between rounded-r-2xl
        `}
      >
        {/* Header */}
        <div className="p-4">
          <div className="flex items-end justify-end">
            <button
              onClick={() => onToggle(!isOpen)}
              className="flex items-end justify-end p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors"
            >
              {isOpen ? (
                <PanelLeftClose size={24} className="text-white" />
              ) : (
                <PanelRightClose size={24} className="text-white" />
              )}
            </button>
          </div>

          {/* <div className="mt-4 flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img src={LuminLogo} alt="Lumin  AI Logo" />
            </div>
            {isOpen && (
              <span className="ml-3 text-xl font-semibold text-white">
                Lumin
              </span>
            )}
          </div> */}
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-2 overflow-y-auto">
          <ul className="px-3 space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={item.action}
                  className={`
                    w-full flex items-center p-3 rounded-lg
                    text-gray-600 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-zinc-600
                    transition-colors duration-200
                    ${isOpen ? "justify-start" : "justify-center"}
                  `}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isOpen && <span className="ml-3">{item.title}</span>}
                </button>
                {isHistoryOpen && isOpen && (
                  <ul className="mt-2 space-y-2">
                    {history.map((chat) => (
                      <li
                        key={chat.id}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                      >
                        <div className="text-sm text-gray-300">
                          <div className="font-medium">{chat.title}</div>
                          <div className="text-xs text-gray-400">
                            {chat.date}
                          </div>
                          <div className="text-xs text-gray-500 truncate mt-1">
                            {chat.preview}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className={`
              w-full flex items-center p-3 rounded-lg
              text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-zinc-600
              transition-colors duration-200
              ${isOpen ? "justify-start" : "justify-center"}
            `}
          >
            <Logout size={24} />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => onToggle(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
