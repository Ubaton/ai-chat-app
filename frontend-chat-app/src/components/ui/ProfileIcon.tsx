import React, { useState, useEffect } from "react";
import "../../../src/index.css";
import { Link } from "@tanstack/react-router";

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

  return (
    <div className="">
      <div
        className="fixed top-4 right-4 bg-zinc-800 h-12 w-12 rounded-full z-50 flex justify-center items-center cursor-pointer dropdown-toggle"
        onClick={toggleDropdown}
      >
        <img src="/Ray.jpg" alt="Raymond Image" className="rounded-full" />
      </div>
      {isOpen && (
        <div className="absolute right-4 mt-[4.5rem] w-48 bg-zinc-900 rounded-lg shadow-lg z-50 dropdown-menu">
          <ul className="py-2">
            <li className="px-4 py-2 text-white hover:bg-zinc-800 cursor-pointer">
              Customize Lumin
            </li>
            <Link to="settings">
              <li className="px-4 py-2 text-white hover:bg-zinc-800 cursor-pointer">
                Settings
              </li>
            </Link>
            <Link to="plan">
              <li className="px-4 py-2 text-white hover:bg-zinc-800 cursor-pointer">
                Upgrade Plan
              </li>
            </Link>
            <li className="px-4 py-2 text-white hover:bg-zinc-800 cursor-pointer">
              Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
