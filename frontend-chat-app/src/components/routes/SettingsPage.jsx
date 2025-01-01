import React, { useState } from "react";
import {
  CogFour as Settings,
  User,
  Microphone as Mic,
  Database,
  Grid,
  Lock,
} from "@mynaui/icons-react";
import { Link } from "@tanstack/react-router";

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
    <div className="flex justify-center bg-zinc-800 text-white p-8 min-h-screen">
      <div className="flex flex-col justify-center w-full h-full">
        <div className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-xl font-semibold">Settings</h1>
          <Link to="/">
            <button
              className="text-zinc-400 hover:text-white transition-colors"
              onClick={() => console.log("Close settings")}
            >
              <span className="text-xl px-2">&times;</span>
            </button>
          </Link>
        </div>

        <div className="flex gap-8 w-full">
          {/* Navigation Sidebar */}
          <div className="w-64">
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

          {/* Settings Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

const GeneralSettings = ({ settings, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span>Theme</span>
        <select
          className="bg-transparent border border-zinc-700 rounded px-2 py-1"
          value={settings.theme}
          onChange={(e) => onChange("theme", e.target.value)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <span>Always show code when using data analyst</span>
        <Toggle
          value={settings.showCode}
          onChange={(value) => onChange("showCode", value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <span>Language</span>
        <select
          className="bg-transparent border border-zinc-700 rounded px-2 py-1"
          value={settings.language}
          onChange={(e) => onChange("language", e.target.value)}
        >
          <option value="auto-detect">Auto-detect</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <span>Archived chats</span>
        <button
          onClick={() => console.log("Manage archives")}
          className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          Manage
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span>Archive all chats</span>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to archive all chats?")) {
              console.log("Archiving all chats");
            }
          }}
          className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          Archive all
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span>Delete all chats</span>
        <button
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete all chats? This action cannot be undone."
              )
            ) {
              console.log("Deleting all chats");
            }
          }}
          className="px-3 py-1 rounded bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
        >
          Delete all
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span>Log out on this device</span>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              console.log("Logging out");
            }
          }}
          className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

const PersonalizationSettings = ({ settings, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Personalization</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Email Notifications</span>
          <Toggle
            value={settings.emailNotifications}
            onChange={(value) => onChange("emailNotifications", value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>SMS Notifications</span>
          <Toggle
            value={settings.smsNotifications}
            onChange={(value) => onChange("smsNotifications", value)}
          />
        </div>
      </div>
    </div>
  );
};

const SpeechSettings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold mb-4">Speech Settings</h2>
    <p className="text-zinc-400">
      Speech settings and controls will appear here.
    </p>
  </div>
);

const DataSettings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold mb-4">Data Controls</h2>
    <p className="text-zinc-400">Data control settings will appear here.</p>
  </div>
);

const BuilderSettings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold mb-4">Builder Profile</h2>
    <p className="text-zinc-400">Builder profile settings will appear here.</p>
  </div>
);

const ConnectedApps = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold mb-4">Connected Apps</h2>
    <p className="text-zinc-400">Connected apps will appear here.</p>
  </div>
);

const SecuritySettings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
    <p className="text-zinc-400">Security settings will appear here.</p>
  </div>
);

const NavItem = ({ icon, text, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-2 rounded transition-colors ${
        active ? "bg-zinc-800" : "hover:bg-zinc-800/50"
      }`}
    >
      {icon}
      <span className="text-sm">{text}</span>
    </button>
  );
};

const Toggle = ({ value, onChange }) => {
  return (
    <button
      className={`w-12 h-6 rounded-full p-1 transition-colors ${
        value ? "bg-violet-500" : "bg-zinc-600"
      }`}
      onClick={() => onChange(!value)}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transition-transform ${
          value ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default SettingsPage;
