import PropTypes from "prop-types";
import { Toggle } from "../ui/Toggle";

const DataSettings = ({ settings, onChange }) => {
  const handleExportData = () => {
    // Implement data export functionality
    const data = {
      settings: settings,
      chats: JSON.parse(localStorage.getItem("chats") || "[]"),
      // Add other data as needed
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat-app-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div className="space-y-1">
          <span className="text-zinc-300">Analytics</span>
          <p className="text-sm text-zinc-500">
            Help improve the app by sending anonymous usage data
          </p>
        </div>
        <Toggle
          value={settings.analyticsEnabled}
          onChange={(value) => onChange("analyticsEnabled", value)}
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div className="space-y-1">
          <span className="text-zinc-300">Auto Backup</span>
          <p className="text-sm text-zinc-500">
            Automatically backup your data to the cloud
          </p>
        </div>
        <Toggle
          value={settings.autoBackup}
          onChange={(value) => onChange("autoBackup", value)}
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div className="space-y-1">
          <span className="text-zinc-300">Storage Limit</span>
          <p className="text-sm text-zinc-500">
            Maximum storage space for your data
          </p>
        </div>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.storageLimit}
          onChange={(e) => onChange("storageLimit", e.target.value)}
        >
          <option value="1GB">1 GB</option>
          <option value="5GB">5 GB</option>
          <option value="10GB">10 GB</option>
          <option value="20GB">20 GB</option>
          <option value="50GB">50 GB</option>
        </select>
      </div>

      <div className="mt-8 space-y-4">
        <button
          type="button"
          className="w-full px-4 py-3 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-all duration-200"
          onClick={handleExportData}
        >
          Export All Data
        </button>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 px-4 py-3 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-all duration-200"
          >
            Import Data
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-3 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-all duration-200"
          >
            Backup Now
          </button>
        </div>

        <button
          type="button"
          className="w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to clear all data? This action cannot be undone."
              )
            ) {
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
};

DataSettings.propTypes = {
  settings: PropTypes.shape({
    analyticsEnabled: PropTypes.bool.isRequired,
    autoBackup: PropTypes.bool.isRequired,
    storageLimit: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DataSettings;
