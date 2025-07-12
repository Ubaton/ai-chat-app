import PropTypes from "prop-types";
import { Toggle } from "../ui/Toggle";

const PersonalizationSettings = ({ settings, onChange }) => {
  const responseStyles = [
    { value: "balanced", label: "Balanced" },
    { value: "creative", label: "Creative" },
    { value: "precise", label: "Precise" },
  ];

  const fontSizes = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Font Size</span>
          <span className="text-zinc-500 text-sm">
            Adjust the size of text in chat
          </span>
        </div>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.fontSize}
          onChange={(e) => onChange("fontSize", e.target.value)}
        >
          {fontSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Assistant Name</span>
          <span className="text-zinc-500 text-sm">
            Customize how you want to call your AI assistant
          </span>
        </div>
        <input
          type="text"
          value={settings.assistantName}
          onChange={(e) => onChange("assistantName", e.target.value)}
          placeholder="Enter name"
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200 text-white"
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Response Style</span>
          <span className="text-zinc-500 text-sm">
            Choose how Lumin should respond to your queries
          </span>
        </div>
        <select
          value={settings.responseStyle}
          onChange={(e) => onChange("responseStyle", e.target.value)}
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
        >
          {responseStyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Custom Instructions</span>
          <span className="text-zinc-500 text-sm">
            Add specific instructions for how Lumin should behave
          </span>
        </div>
        <textarea
          value={settings.customInstructions}
          onChange={(e) => onChange("customInstructions", e.target.value)}
          placeholder="Enter custom instructions..."
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200 w-96 h-32 resize-none text-white"
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Conversation Memory</span>
          <span className="text-zinc-500 text-sm">
            Allow Lumin to remember context from previous messages
          </span>
        </div>
        <Toggle
          value={settings.memoryEnabled}
          onChange={(value) => onChange("memoryEnabled", value)}
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Code Snippets</span>
          <span className="text-zinc-500 text-sm">
            Show line numbers in code blocks
          </span>
        </div>
        <Toggle
          value={settings.showLineNumbers}
          onChange={(value) => onChange("showLineNumbers", value)}
        />
      </div>

      <div className="mt-8 p-4 bg-violet-500/10 rounded-lg border border-violet-500/20">
        <h3 className="text-violet-400 font-medium mb-2">Memory Management</h3>
        <p className="text-zinc-400 text-sm mb-4">
          Clear conversation memory to start fresh. This will not delete your
          chat history.
        </p>
        <button
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to clear conversation memory?"
              )
            ) {
              // Implement memory clearing logic
              onChange("clearMemory", true);
            }
          }}
        >
          Clear Memory
        </button>
      </div>
    </div>
  );
};

PersonalizationSettings.propTypes = {
  settings: PropTypes.shape({
    fontSize: PropTypes.string.isRequired,
    assistantName: PropTypes.string.isRequired,
    responseStyle: PropTypes.string.isRequired,
    customInstructions: PropTypes.string.isRequired,
    memoryEnabled: PropTypes.bool.isRequired,
    showLineNumbers: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PersonalizationSettings;
