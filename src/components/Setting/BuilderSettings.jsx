import PropTypes from "prop-types";
import { Toggle } from "../ui/Toggle";

const BuilderSettings = ({ settings, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div className="space-y-1">
          <span className="text-zinc-300">Default Framework</span>
          <p className="text-sm text-zinc-500">
            Choose your preferred framework for new projects
          </p>
        </div>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.defaultFramework}
          onChange={(e) => onChange("defaultFramework", e.target.value)}
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="svelte">Svelte</option>
          <option value="vanilla">Vanilla JS</option>
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div className="space-y-1">
          <span className="text-zinc-300">Auto-Complete</span>
          <p className="text-sm text-zinc-500">
            Enable AI-powered code completion
          </p>
        </div>
        <Toggle
          value={settings.autoComplete}
          onChange={(value) => onChange("autoComplete", value)}
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div className="space-y-1">
          <span className="text-zinc-300">Live Preview</span>
          <p className="text-sm text-zinc-500">
            Show live preview while coding
          </p>
        </div>
        <Toggle
          value={settings.livePreview}
          onChange={(value) => onChange("livePreview", value)}
        />
      </div>

      <div className="mt-8">
        <button
          type="button"
          className="w-full px-4 py-3 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-all duration-200"
          onClick={() => {
            /* Implement template management */
          }}
        >
          Manage Project Templates
        </button>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="w-full px-4 py-3 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-all duration-200"
          onClick={() => {
            /* Implement snippet management */
          }}
        >
          Manage Code Snippets
        </button>
      </div>
    </div>
  );
};

BuilderSettings.propTypes = {
  settings: PropTypes.shape({
    defaultFramework: PropTypes.string.isRequired,
    autoComplete: PropTypes.bool.isRequired,
    livePreview: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BuilderSettings;
