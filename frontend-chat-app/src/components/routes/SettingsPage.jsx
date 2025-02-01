import { useState } from "react";
import {
  CogFour as Settings,
  User,
  Microphone as Mic,
  Database,
  Grid,
  Lock,
} from "@mynaui/icons-react";
import { Link } from "@tanstack/react-router";
import SpeechSettings from "../Setting/SpeechSettings";
import DataSettings from "../Setting/DataSettings";
import BuilderSettings from "../Setting/BuilderSettings";
import ConnectedApps from "../Setting/ConnectedApps";
import SecuritySettings from "../Setting/SecuritySettings";
import PersonalizationSettings from "../Setting/PersonalizationSettings";

const SettingsPage = () => {
  const [currentSection, setCurrentSection] = useState("general");
  const [settings, setSettings] = useState({
    theme: "system",
    showCode: true,
    language: "auto-detect",
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const renderContent = () => {
    switch (currentSection) {
      case "general":
        return (
          <GeneralSettings settings={settings} onChange={handleSettingChange} />
        );
      case "personalization":
        return (
          <PersonalizationSettings
            settings={settings}
            onChange={handleSettingChange}
          />
        );
      case "speech":
        return (
          <SpeechSettings settings={settings} onChange={handleSettingChange} />
        );
      case "data":
        return <DataSettings />;
      case "builder":
        return <BuilderSettings />;
      case "apps":
        return <ConnectedApps />;
      case "security":
        return <SecuritySettings />;
      default:
        return (
          <GeneralSettings settings={settings} onChange={handleSettingChange} />
        );
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-8 min-h-screen">
      <div className="flex flex-col w-full max-w-6xl backdrop-blur-lg bg-white/5 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-8 w-full border-b border-white/10 pb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <Link to="/">
            <button className="text-zinc-400 hover:text-white transition-all transform hover:scale-110 duration-200">
              <span className="text-2xl px-2">&times;</span>
            </button>
          </Link>
        </div>

        <div className="flex gap-8 w-full">
          <div className="w-72 bg-black/20 rounded-xl p-4">
            <nav className="space-y-2">
              <NavItem
                icon={<Settings className="w-5 h-5" />}
                text="General"
                active={currentSection === "general"}
                onClick={() => setCurrentSection("general")}
              />
              <NavItem
                icon={<User className="w-5 h-5" />}
                text="Personalization"
                active={currentSection === "personalization"}
                onClick={() => setCurrentSection("personalization")}
              />
              <NavItem
                icon={<Mic className="w-5 h-5" />}
                text="Speech"
                active={currentSection === "speech"}
                onClick={() => setCurrentSection("speech")}
              />
              <NavItem
                icon={<Database className="w-5 h-5" />}
                text="Data controls"
                active={currentSection === "data"}
                onClick={() => setCurrentSection("data")}
              />
              <NavItem
                icon={<Grid className="w-5 h-5" />}
                text="Builder profile"
                active={currentSection === "builder"}
                onClick={() => setCurrentSection("builder")}
              />
              <NavItem
                icon={<Grid className="w-5 h-5" />}
                text="Connected apps"
                active={currentSection === "apps"}
                onClick={() => setCurrentSection("apps")}
              />
              <NavItem
                icon={<Lock className="w-5 h-5" />}
                text="Security"
                active={currentSection === "security"}
                onClick={() => setCurrentSection("security")}
              />
            </nav>
          </div>

          <div className="flex-1 bg-black/20 rounded-xl p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

const GeneralSettings = ({ settings, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Theme</span>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.theme}
          onChange={(e) => onChange("theme", e.target.value)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Show code in data analyst</span>
        <Toggle
          value={settings.showCode}
          onChange={(value) => onChange("showCode", value)}
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Language</span>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.language}
          onChange={(e) => onChange("language", e.target.value)}
        >
          <option value="auto-detect">Auto-detect</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Archived chats</span>
        <button className="px-4 py-2 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-all duration-200 hover:scale-105">
          Manage
        </button>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Archive all chats</span>
        <button className="px-4 py-2 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-all duration-200 hover:scale-105">
          Archive all
        </button>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Delete all chats</span>
        <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200 hover:scale-105">
          Delete all
        </button>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Log out</span>
        <button className="px-4 py-2 rounded-lg bg-zinc-700/50 hover:bg-zinc-700 transition-all duration-200 hover:scale-105">
          Log out
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 ${
        active
          ? "bg-violet-500/20 text-violet-400"
          : "hover:bg-white/5 text-zinc-400 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

const Toggle = ({ value, onChange }) => {
  return (
    <button
      className={`w-14 h-7 rounded-full p-1 transition-all duration-300 ${
        value ? "bg-violet-500" : "bg-zinc-700"
      }`}
      onClick={() => onChange(!value)}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
          value ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default SettingsPage;