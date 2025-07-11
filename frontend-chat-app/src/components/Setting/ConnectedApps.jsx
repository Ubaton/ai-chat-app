import { useState } from "react";
import { Toggle } from "../ui/Toggle";

const ConnectedApps = () => {
  const [connectedApps, setConnectedApps] = useState([
    {
      id: "github",
      name: "GitHub",
      icon: "🐙",
      connected: true,
      lastSync: "2 hours ago",
    },
    {
      id: "gitlab",
      name: "GitLab",
      icon: "🦊",
      connected: false,
      lastSync: null,
    },
    {
      id: "slack",
      name: "Slack",
      icon: "💬",
      connected: true,
      lastSync: "5 minutes ago",
    },
  ]);

  const handleToggleConnection = (appId) => {
    setConnectedApps((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              connected: !app.connected,
              lastSync: !app.connected ? "Just now" : null,
            }
          : app
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-zinc-200 mb-2">
          Connected Applications
        </h2>
        <p className="text-sm text-zinc-500">
          Manage your connected applications
        </p>
      </div>

      {connectedApps.map((app) => (
        <div
          key={app.id}
          className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">{app.icon}</span>
            <div>
              <h3 className="text-zinc-300">{app.name}</h3>
              {app.connected && app.lastSync && (
                <p className="text-sm text-zinc-500">
                  Last synced: {app.lastSync}
                </p>
              )}
            </div>
          </div>
          <Toggle
            value={app.connected}
            onChange={() => handleToggleConnection(app.id)}
          />
        </div>
      ))}

      <div className="mt-8">
        <button
          type="button"
          className="w-full px-4 py-3 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-all duration-200"
        >
          Connect New App
        </button>
      </div>
    </div>
  );
};

export default ConnectedApps;
