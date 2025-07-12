import React, { useState } from "react";
import Sidebar from "../Sidebar";
import ProfileIcon from "../ui/ProfileIcon";
import {
  User,
  Cog,
  Bell,
  Shield,
  Moon,
  Sun,
  Globe,
  Key,
  Envelope,
  Telephone,
  Location,
  Calendar,
  Camera,
  Save,
  Edit,
  Trash,
  Activity,
  FileText,
  Download,
  Sparkles,
} from "@mynaui/icons-react";
import { Link } from "@tanstack/react-router";

function UserProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    role: "Senior Product Manager",
    company: "Tech Solutions Inc.",
    bio: "Passionate about AI and technology innovation. Leading digital transformation initiatives with a focus on user experience and business growth.",
    avatar: "/api/placeholder/150/150",
  });

  const [stats] = useState({
    totalChats: 1247,
    totalTokens: "2.4M",
    averageDaily: 24,
    uptime: "99.9%",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Cog className="w-4 h-4" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
    { id: "usage", label: "Usage", icon: <Activity className="w-4 h-4" /> },
  ];

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log("Saving profile data:", profileData);
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1"
            />
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-2xl font-bold bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2 text-white w-full"
                />
                <input
                  type="text"
                  value={profileData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="text-slate-300 bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2 w-full"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {profileData.name}
                </h2>
                <p className="text-slate-300 mb-1">{profileData.role}</p>
                <p className="text-slate-400 text-sm">{profileData.company}</p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Envelope className="w-4 h-4 inline mr-2" />
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2 text-white"
              />
            ) : (
              <p className="text-slate-200">{profileData.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Telephone className="w-4 h-4 inline mr-2" />
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2 text-white"
              />
            ) : (
              <p className="text-slate-200">{profileData.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Location className="w-4 h-4 inline mr-2" />
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2 text-white"
              />
            ) : (
              <p className="text-slate-200">{profileData.location}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Member Since
            </label>
            <p className="text-slate-200">{profileData.joinDate}</p>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">About</h3>
        {isEditing ? (
          <textarea
            value={profileData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={4}
            className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2 text-white resize-none"
          />
        ) : (
          <p className="text-slate-200 leading-relaxed">{profileData.bio}</p>
        )}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Preferences</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-slate-400" />
              ) : (
                <Sun className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-slate-400 text-sm">
                  Toggle between light and dark theme
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                darkMode ? "bg-blue-500" : "bg-slate-600"
              }`}
            >
              <div
                className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                  darkMode ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-white font-medium">Language</p>
                <p className="text-slate-400 text-sm">
                  Choose your preferred language
                </p>
              </div>
            </div>
            <select className="bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2 text-white">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          Data & Privacy
        </h3>
        <div className="space-y-4">
          <button className="flex items-center gap-3 w-full p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors">
            <Download className="w-5 h-5 text-blue-400" />
            <span className="text-white">Download Your Data</span>
          </button>
          <button className="flex items-center gap-3 w-full p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors">
            <Trash className="w-5 h-5 text-red-400" />
            <span className="text-red-400">Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-6">
        Notification Preferences
      </h3>
      <div className="space-y-6">
        {Object.entries(notifications).map(([type, enabled]) => (
          <div key={type} className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium capitalize">
                {type} Notifications
              </p>
              <p className="text-slate-400 text-sm">
                {type === "email" && "Receive notifications via email"}
                {type === "push" && "Browser push notifications"}
                {type === "sms" && "SMS notifications for critical updates"}
                {type === "marketing" && "Marketing and promotional emails"}
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange(type)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                enabled ? "bg-blue-500" : "bg-slate-600"
              }`}
            >
              <div
                className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                  enabled ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          Security Settings
        </h3>
        <div className="space-y-4">
          <button className="flex items-center gap-3 w-full p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors">
            <Key className="w-5 h-5 text-blue-400" />
            <span className="text-white">Change Password</span>
          </button>
          <button className="flex items-center gap-3 w-full p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-white">Two-Factor Authentication</span>
          </button>
          <button className="flex items-center gap-3 w-full p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors">
            <FileText className="w-5 h-5 text-purple-400" />
            <span className="text-white">Active Sessions</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsageTab = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Total Chats</h3>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalChats}</p>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Tokens Used</h3>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalTokens}</p>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Daily Average</h3>
          </div>
          <p className="text-2xl font-bold text-white">{stats.averageDaily}</p>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-xl">
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Uptime</h3>
          </div>
          <p className="text-2xl font-bold text-white">{stats.uptime}</p>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "settings":
        return renderSettingsTab();
      case "notifications":
        return renderNotificationsTab();
      case "security":
        return renderSecurityTab();
      case "usage":
        return renderUsageTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
        chatHistory={[]}
      />

      {/* Header */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <Link to="/">
              <button className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <img
                  src="/public/Lumin.png"
                  alt="Lumin Logo"
                  className="h-6 w-6"
                />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-white">User Profile</h1>
              <p className="text-sm text-slate-400">
                Manage your account settings
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <ProfileIcon />
          </div>
        </div>
      </header>

      <main
        className={`flex-1 transition-all duration-300 pt-20 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="w-full mx-auto px-6 py-8">
          {/* Tab Navigation */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2 mb-8">
            <nav className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
}

export default UserProfilePage;
