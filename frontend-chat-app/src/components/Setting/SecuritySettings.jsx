import PropTypes from "prop-types";
import { Toggle } from "../ui/Toggle";

const SecuritySettings = ({ settings, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div className="space-y-1">
          <span className="text-zinc-300">Two-Factor Authentication</span>
          <p className="text-sm text-zinc-500">
            Add an extra layer of security to your account
          </p>
        </div>
        <Toggle
          value={settings.twoFactorAuth}
          onChange={(value) => onChange("twoFactorAuth", value)}
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div className="space-y-1">
          <span className="text-zinc-300">Password Timeout</span>
          <p className="text-sm text-zinc-500">
            Time before requiring password re-entry
          </p>
        </div>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.passwordTimeout}
          onChange={(e) => onChange("passwordTimeout", e.target.value)}
        >
          <option value="15min">15 minutes</option>
          <option value="30min">30 minutes</option>
          <option value="1h">1 hour</option>
          <option value="4h">4 hours</option>
          <option value="24h">24 hours</option>
          <option value="never">Never</option>
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div className="space-y-1">
          <span className="text-zinc-300">Session Timeout</span>
          <p className="text-sm text-zinc-500">Time before automatic logout</p>
        </div>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.sessionTimeout}
          onChange={(e) => onChange("sessionTimeout", e.target.value)}
        >
          <option value="1h">1 hour</option>
          <option value="4h">4 hours</option>
          <option value="8h">8 hours</option>
          <option value="24h">24 hours</option>
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
        </select>
      </div>

      <div className="mt-8">
        <button
          type="button"
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all duration-200"
          onClick={() => {
            /* Implement change password flow */
          }}
        >
          Change Password
        </button>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200"
          onClick={() => {
            /* Implement account deletion flow */
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

SecuritySettings.propTypes = {
  settings: PropTypes.shape({
    twoFactorAuth: PropTypes.bool.isRequired,
    passwordTimeout: PropTypes.string.isRequired,
    sessionTimeout: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SecuritySettings;
