import PropTypes from "prop-types";
import { Toggle } from "../ui/Toggle";

const PersonalizationSettings = ({ settings, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Font Size</span>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.fontSize}
          onChange={(e) => onChange("fontSize", e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Color Scheme</span>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.colorScheme}
          onChange={(e) => onChange("colorScheme", e.target.value)}
        >
          <option value="violet">Violet</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="rose">Rose</option>
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Compact Mode</span>
        <Toggle
          value={settings.compactMode}
          onChange={(value) => onChange("compactMode", value)}
        />
      </div>
    </div>
  );
};

PersonalizationSettings.propTypes = {
  settings: PropTypes.shape({
    fontSize: PropTypes.string.isRequired,
    colorScheme: PropTypes.string.isRequired,
    compactMode: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PersonalizationSettings;
