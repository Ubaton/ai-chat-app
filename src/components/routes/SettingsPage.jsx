import { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  CogFour as Settings,
  User,
  Microphone as Mic,
  Database,
  Grid,
  Lock,
  X,
} from "@mynaui/icons-react";
import { Link } from "@tanstack/react-router";
import SpeechSettings from "../Setting/SpeechSettings";
import DataSettings from "../Setting/DataSettings";
import BuilderSettings from "../Setting/BuilderSettings";
import ConnectedApps from "../Setting/ConnectedApps";
import SecuritySettings from "../Setting/SecuritySettings";
import PersonalizationSettings from "../Setting/PersonalizationSettings";
import LuminLog from "../../../public/Lumin.png";
import SettingsContext from "../../context/SettingsContext";

// NavItem component with updated styling to match HomePage
const NavItem = ({ icon, text, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 border border-blue-500/30"
          : "hover:bg-slate-700/50 text-slate-400 hover:text-slate-300 border border-transparent"
      }`}
    >
      <div
        className={`p-1 rounded-lg ${active ? "text-blue-400" : "text-slate-400"}`}
      >
        {icon}
      </div>
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

// GeneralSettings component with updated styling
const GeneralSettings = ({ settings, onChange }) => {
  const { deleteAllChats, archiveAllChats, logout } =
    useContext(SettingsContext);

  const handleDeleteAll = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all chats? This action cannot be undone."
      )
    ) {
      deleteAllChats();
    }
  };

  const handleArchiveAll = () => {
    if (window.confirm("Are you sure you want to archive all chats?")) {
      archiveAllChats();
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center p-4 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
        <span className="text-slate-300 font-medium">Theme</span>
        <select
          className="bg-slate-800/80 border border-slate-600/50 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          value={settings.theme}
          onChange={(e) => onChange("theme", e.target.value)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="flex justify-between items-center p-4 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
        <span className="text-slate-300 font-medium">Language</span>
        <select
          className="bg-slate-800/80 border border-slate-600/50 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          value={settings.language}
          onChange={(e) => onChange("language", e.target.value)}
        >
          <option value="auto-detect">Auto-detect</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
      </div>

      <div className="flex justify-between items-center p-4 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
        <span className="text-slate-300 font-medium">Archived chats</span>
        <Link to="/archived">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-600/30 transition-all duration-300 hover:scale-105"
          >
            Manage
          </button>
        </Link>
      </div>

      <div className="flex justify-between items-center p-4 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
        <span className="text-slate-300 font-medium">Archive all chats</span>
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-600/30 transition-all duration-300 hover:scale-105"
          onClick={handleArchiveAll}
        >
          Archive all
        </button>
      </div>

      <div className="flex justify-between items-center p-4 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-red-500/30 transition-all duration-300">
        <span className="text-slate-300 font-medium">Delete all chats</span>
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105"
          onClick={handleDeleteAll}
        >
          Delete all
        </button>
      </div>

      <div className="flex justify-between items-center p-4 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
        <span className="text-slate-300 font-medium">Log out</span>
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700 hover:text-white transition-all duration-300 hover:scale-105"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

GeneralSettings.propTypes = {
  settings: PropTypes.shape({
    theme: PropTypes.string.isRequired,
    showCode: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    emailNotifications: PropTypes.bool.isRequired,
    smsNotifications: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

// Main SettingsPage component with updated styling to match HomePage
const SettingsPage = () => {
  const [currentSection, setCurrentSection] = useState("general");
  const { settings, updateSettings } = useContext(SettingsContext);

  const handleSettingChange = (key, value) => {
    updateSettings(key, value);
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
            settings={settings.personalization}
            onChange={(key, value) =>
              updateSettings("personalization", {
                ...settings.personalization,
                [key]: value,
              })
            }
          />
        );
      case "speech":
        return (
          <SpeechSettings
            settings={settings.speech}
            onChange={(key, value) =>
              updateSettings("speech", { ...settings.speech, [key]: value })
            }
          />
        );
      case "data":
        return (
          <DataSettings
            settings={settings.data}
            onChange={(key, value) =>
              updateSettings("data", { ...settings.data, [key]: value })
            }
          />
        );
      case "builder":
        return (
          <BuilderSettings
            settings={settings.builder}
            onChange={(key, value) =>
              updateSettings("builder", { ...settings.builder, [key]: value })
            }
          />
        );
      case "apps":
        return <ConnectedApps />;
      case "security":
        return (
          <SecuritySettings
            settings={settings.security}
            onChange={(key, value) =>
              updateSettings("security", { ...settings.security, [key]: value })
            }
          />
        );
      default:
        return (
          <GeneralSettings settings={settings} onChange={handleSettingChange} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements - matching HomePage */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Header - matching HomePage header */}
      <header className="fixed top-0 right-0 left-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <img src={LuminLog} alt="Lumin Logo" className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Settings</h1>
              <p className="text-sm text-slate-400">
                Configure your AI assistant
              </p>
            </div>
          </div>
          <Link to="/">
            <button
              type="button"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 h-[calc(100vh-8rem)]">
            {/* Sidebar Navigation */}
            <div className="w-80 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
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

            {/* Content Area */}
            <div className="flex-1 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white capitalize mb-2">
                  {currentSection === "apps"
                    ? "Connected Apps"
                    : currentSection}
                </h2>
                <p className="text-slate-400">
                  {currentSection === "general" &&
                    "Manage your general preferences and account settings"}
                  {currentSection === "personalization" &&
                    "Customize your AI assistant's behavior and responses"}
                  {currentSection === "speech" &&
                    "Configure voice and speech recognition settings"}
                  {currentSection === "data" &&
                    "Control how your data is used and stored"}
                  {currentSection === "builder" &&
                    "Set up your builder profile and preferences"}
                  {currentSection === "apps" &&
                    "Manage your connected applications and integrations"}
                  {currentSection === "security" &&
                    "Configure security settings and privacy options"}
                </p>
              </div>

              <div className="relative">{renderContent()}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
