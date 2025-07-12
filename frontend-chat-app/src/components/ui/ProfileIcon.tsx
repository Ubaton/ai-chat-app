import React, { useState, useEffect } from "react";
import "../../../src/index.css";
import { Link } from "@tanstack/react-router";
import {
  CreditCard,
  User,
  ChevronDown,
  UserSettings,
  Logout,
} from "@mynaui/icons-react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (
      !e.target.closest(".dropdown-toggle") &&
      !e.target.closest(".dropdown-menu")
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", closeDropdown);
    } else {
      document.removeEventListener("click", closeDropdown);
    }

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [isOpen]);

  const menuItems = [
    {
      icon: <User size={16} />,
      label: "Profile",
      to: "profile",
    },
    {
      icon: <UserSettings size={16} />,
      label: "Settings",
      to: "settings",
    },
    {
      icon: <CreditCard size={16} />,
      label: "Upgrade Plan",
      to: "plan",
    },
    {
      icon: <Logout size={16} />,
      label: "Log out",
      action: () => {
        // Handle logout logic here
        console.log("Logging out...");
      },
    },
  ];

  return (
    <div className="relative">
      {/* Profile Button */}
      <div
        className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-200 cursor-pointer dropdown-toggle"
        onClick={toggleDropdown}
      >
        <div className="relative">
          <img
            src="/Ray.jpg"
            alt="Raymond Image"
            className="h-8 w-8 rounded-full ring-2 ring-slate-600/50 object-cover"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl shadow-black/50 z-50 dropdown-menu">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <img
                  src="/Ray.jpg"
                  alt="Raymond Image"
                  className="h-10 w-10 rounded-full ring-2 ring-slate-600/50 object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-white">Raymond</div>
                  <div className="text-xs text-slate-400">
                    raymond@example.com
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.to ? (
                    <Link to={item.to} className="block">
                      <div className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 cursor-pointer">
                        <span className="text-slate-400">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                      </div>
                    </Link>
                  ) : (
                    <div
                      onClick={item.action}
                      className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 cursor-pointer"
                    >
                      <span className="text-slate-400">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">Free Plan</div>
                <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                  Active
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
