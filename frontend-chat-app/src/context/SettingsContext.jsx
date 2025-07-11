import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const SettingsContext = createContext();

const defaultSettings = {
  theme: "system",
  showCode: true,
  language: "auto-detect",
  emailNotifications: true,
  smsNotifications: false,
  speech: {
    voice: "default",
    pitch: 1,
    rate: 1,
    volume: 1,
  },
  personalization: {
    fontSize: "medium",
    colorScheme: "violet",
    compactMode: false,
  },
  security: {
    twoFactorAuth: false,
    passwordTimeout: "30min",
    sessionTimeout: "24h",
  },
  builder: {
    defaultFramework: "react",
    autoComplete: true,
    livePreview: true,
  },
  data: {
    analyticsEnabled: true,
    autoBackup: true,
    storageLimit: "5GB",
  },
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("appSettings");
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));

    // Apply theme
    if (settings.theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle(
        "dark",
        settings.theme === "dark"
      );
    }
  }, [settings]);

  const updateSettings = (key, value) => {
    setSettings((prev) => {
      if (typeof key === "object") {
        return { ...prev, ...key };
      }
      return { ...prev, [key]: value };
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const deleteAllChats = () => {
    // Implement chat deletion logic here
    localStorage.removeItem("chats");
    // You might want to call an API endpoint to delete chats from the backend
  };

  const archiveAllChats = () => {
    // Implement chat archiving logic here
    const chats = JSON.parse(localStorage.getItem("chats") || "[]");
    const archivedChats = chats.map((chat) => ({ ...chat, archived: true }));
    localStorage.setItem("chats", JSON.stringify(archivedChats));
    // You might want to call an API endpoint to archive chats in the backend
  };

  const logout = () => {
    // Clear local storage
    localStorage.clear();
    // Reset settings to default
    setSettings(defaultSettings);
    // Redirect to login page or home
    window.location.href = "/";
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        deleteAllChats,
        archiveAllChats,
        logout,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
