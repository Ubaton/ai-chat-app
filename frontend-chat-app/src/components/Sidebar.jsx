import {
  ClockCircle,
  Logout,
  PanelLeftClose,
  PanelRightClose,
  EditOne,
  Star,
} from "@mynaui/icons-react";
import React, { useState } from "react";
import LuminLogo from "../assets/Lumin.svg";

const Sidebar = ({ isOpen, onToggle, chatHistory }) => {
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
        className={`h-screen bg-white dark:bg-zinc-900 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col justify-between rounded-r-2xl`}
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
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-2 overflow-y-auto">
          <ul className="px-3 space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={item.action}
                  className={`w-full flex items-center p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors duration-200 ${
                    isOpen ? "justify-start" : "justify-center"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isOpen && <span className="ml-3">{item.title}</span>}
                </button>
                {isHistoryOpen && isOpen && (
                  <ul className="mt-2 space-y-2">
                    {chatHistory.map((chat, index) => (
                      <li
                        key={index}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                      >
                        <div className="text-sm text-gray-300">
                          <div className="font-medium">{chat.name}</div>
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
            className={`w-full flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors duration-200 ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <Star className="text-yellow-500" />
            <span className="flex flex-col">
              {isOpen && <span className="font-semibold ml-2">Free Plan</span>}

              {/* <p className="text-sm text-zinc-600 hover:text-zinc-400">
                Tokens: <span className="font-medium">20,000</span>
              </p> */}
            </span>
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

      <div className="mt-4">
        <button className="p-3 rounded-r-full bg-violet-600">
          <EditOne color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
