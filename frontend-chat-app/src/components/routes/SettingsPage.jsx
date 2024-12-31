import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "@mynaui/icons-react";

const SettingsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Link>
      <h1 className="text-4xl font-bold mb-6">Settings</h1>
      <div className="w-full max-w-md">
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mb-4">
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <label className="block mb-2">
            <span className="text-gray-400">Email Address</span>
            <input
              type="email"
              className="mt-1 block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-violet-500"
              placeholder="you@example.com"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-400">Password</span>
            <input
              type="password"
              className="mt-1 block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-violet-500"
              placeholder="********"
            />
          </label>
          <button className="w-full mt-4 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 rounded-md">
            Save Changes
          </button>
        </div>
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
          <label className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-400">Email Notifications</span>
          </label>
          <label className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-400">SMS Notifications</span>
          </label>
          <button className="w-full mt-4 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 rounded-md">
            Update Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
