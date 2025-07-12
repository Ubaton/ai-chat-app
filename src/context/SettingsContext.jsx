import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the Settings Context
const SettingsContext = createContext();

// Default settings configuration
const defaultSettings = {
  theme: "system",
  language: "auto-detect",
  showCode: true,
  emailNotifications: true,
  smsNotifications: false,
  personalization: {
    assistantName: "Lumin AI",
    responseStyle: "balanced",
    customInstructions: "",
    memoryEnabled: true,
    fontSize: "medium",
    showLineNumbers: true,
    colorScheme: "dark",
    messageStyle: "modern",
    keyboardShortcuts: true,
    codeSnippetStyle: "default",
  },
  speech: {
    enabled: false,
    voice: "default",
    speed: 1,
    pitch: 1,
    autoPlay: false,
    volume: 1,
    testPhrase: "Hello! I'm Lumin AI, your intelligent assistant.",
    preferredVoiceGender: "neutral",
    speechRecognition: false,
    continuousSpeech: false,
  },
  data: {
    dataRetention: "30-days",
    analytics: true,
    improveModel: true,
    shareData: false,
    backupFrequency: "weekly",
    autoExport: false,
    storageQuota: "1GB",
    mediaUploadLimit: "50MB",
    encryptData: true,
    compressHistory: true,
  },
  builder: {
    profileName: "",
    description: "",
    website: "",
    publicProfile: false,
    experienceLevel: "beginner",
    preferredLanguages: [],
    githubUsername: "",
    showcaseProjects: [],
    availableForHire: false,
    skills: [],
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: "24-hours",
    loginNotifications: true,
    deviceManagement: true,
    maxDevices: 5,
    passwordUpdateInterval: "90-days",
    ipWhitelist: [],
    failedLoginAttempts: 5,
    lockoutDuration: "30-minutes",
    biometricLogin: false,
  },
  notifications: {
    desktop: true,
    sound: true,
    email: {
      enabled: false,
      frequency: "daily",
      digest: true,
      marketing: false,
    },
    push: {
      enabled: true,
      priority: "high",
      quietHours: false,
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00",
    },
  },
  accessibility: {
    highContrast: false,
    reduceMotion: false,
    fontScale: 1,
    screenReader: false,
    keyboardNavigation: true,
    altTextPreference: "detailed",
  },
  privacy: {
    dataCollection: "minimal",
    thirdPartySharing: false,
    trackingConsent: false,
    personalizedAds: false,
    cookiePreference: "essential",
  },
};

// Utility functions for localStorage
const getStoredSettings = () => {
  try {
    const stored = localStorage.getItem("lumin-settings");
    return stored ? JSON.parse(stored) : defaultSettings;
  } catch (error) {
    console.error("Error reading settings from localStorage:", error);
    return defaultSettings;
  }
};

const saveSettings = (settings) => {
  try {
    localStorage.setItem("lumin-settings", JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings to localStorage:", error);
  }
};

// Chat history utilities
const getChatHistory = () => {
  try {
    const stored = localStorage.getItem("lumin-chat-history");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading chat history from localStorage:", error);
    return [];
  }
};

const saveChatHistory = (history) => {
  try {
    localStorage.setItem("lumin-chat-history", JSON.stringify(history));
  } catch (error) {
    console.error("Error saving chat history to localStorage:", error);
  }
};

const getArchivedChats = () => {
  try {
    const stored = localStorage.getItem("lumin-archived-chats");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading archived chats from localStorage:", error);
    return [];
  }
};

const saveArchivedChats = (chats) => {
  try {
    localStorage.setItem("lumin-archived-chats", JSON.stringify(chats));
  } catch (error) {
    console.error("Error saving archived chats to localStorage:", error);
  }
};

// Theme management
const applyTheme = (theme) => {
  const root = document.documentElement;

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.setAttribute("data-theme", systemTheme);
  } else {
    root.setAttribute("data-theme", theme);
  }
};

// Settings Provider Component
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [chatHistory, setChatHistory] = useState([]);
  const [archivedChats, setArchivedChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = () => {
      const storedSettings = getStoredSettings();
      const storedChatHistory = getChatHistory();
      const storedArchivedChats = getArchivedChats();

      setSettings(storedSettings);
      setChatHistory(storedChatHistory);
      setArchivedChats(storedArchivedChats);

      // Apply theme
      applyTheme(storedSettings.theme);

      setIsLoading(false);
    };

    loadSettings();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (settings.theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [settings.theme]);

  // Save settings when they change
  useEffect(() => {
    if (!isLoading) {
      saveSettings(settings);
      if (settings.theme) {
        applyTheme(settings.theme);
      }
    }
  }, [settings, isLoading]);

  // Save chat history when it changes
  useEffect(() => {
    if (!isLoading) {
      saveChatHistory(chatHistory);
    }
  }, [chatHistory, isLoading]);

  // Save archived chats when they change
  useEffect(() => {
    if (!isLoading) {
      saveArchivedChats(archivedChats);
    }
  }, [archivedChats, isLoading]);

  // Update a specific setting
  const updateSettings = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Update nested settings
  const updateNestedSettings = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Reset all settings to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("lumin-settings");
  };

  // Chat management functions
  const addChatToHistory = (chat) => {
    setChatHistory((prev) => [...prev, chat]);
  };

  const removeChatFromHistory = (chatId) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  const archiveChat = (chatId) => {
    const chatToArchive = chatHistory.find((chat) => chat.id === chatId);
    if (chatToArchive) {
      setArchivedChats((prev) => [
        ...prev,
        { ...chatToArchive, archivedAt: new Date().toISOString() },
      ]);
      removeChatFromHistory(chatId);
    }
  };

  const archiveAllChats = () => {
    const timestamp = new Date().toISOString();
    const chatsToArchive = chatHistory.map((chat) => ({
      ...chat,
      archivedAt: timestamp,
    }));
    setArchivedChats((prev) => [...prev, ...chatsToArchive]);
    setChatHistory([]);
  };

  const deleteAllChats = () => {
    setChatHistory([]);
    localStorage.removeItem("lumin-chat-history");
  };

  const restoreChat = (chatId) => {
    const chatToRestore = archivedChats.find((chat) => chat.id === chatId);
    if (chatToRestore) {
      const { ...restoredChat } = chatToRestore;
      setChatHistory((prev) => [...prev, restoredChat]);
      setArchivedChats((prev) => prev.filter((chat) => chat.id !== chatId));
    }
  };

  const deleteArchivedChat = (chatId) => {
    setArchivedChats((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  const clearArchivedChats = () => {
    setArchivedChats([]);
    localStorage.removeItem("lumin-archived-chats");
  };

  // User management functions
  const logout = () => {
    // Clear all user data
    localStorage.removeItem("lumin-settings");
    localStorage.removeItem("lumin-chat-history");
    localStorage.removeItem("lumin-archived-chats");
    localStorage.removeItem("lumin-user-session");

    // Reset state
    setSettings(defaultSettings);
    setChatHistory([]);
    setArchivedChats([]);

    // Redirect to login or refresh page
    window.location.reload();
  };

  // Export settings
  const exportSettings = () => {
    const exportData = {
      settings,
      chatHistory,
      archivedChats,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `lumin-settings-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Import settings
  const importSettings = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target.result);

          if (importData.settings) {
            setSettings({ ...defaultSettings, ...importData.settings });
          }
          if (importData.chatHistory) {
            setChatHistory(importData.chatHistory);
          }
          if (importData.archivedChats) {
            setArchivedChats(importData.archivedChats);
          }

          resolve("Settings imported successfully");
        } catch (error) {
          reject("Invalid settings file format", error);
        }
      };
      reader.onerror = () => reject("Error reading file");
      reader.readAsText(file);
    });
  };

  const contextValue = {
    // Settings state
    settings,
    isLoading,

    // Settings management
    updateSettings,
    updateNestedSettings,
    resetSettings,
    exportSettings,
    importSettings,

    // Chat management
    chatHistory,
    archivedChats,
    addChatToHistory,
    removeChatFromHistory,
    archiveChat,
    archiveAllChats,
    deleteAllChats,
    restoreChat,
    deleteArchivedChat,
    clearArchivedChats,

    // User management
    logout,

    // Theme utilities
    applyTheme,
  };
  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SettingsContext;
