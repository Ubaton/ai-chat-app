import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SpeechSettings = ({ settings, onChange }) => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    // Get initial list of voices
    updateVoices();

    // Update voices when they become available
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Enable speech</span>
          <span className="text-zinc-500 text-sm">
            Allow Lumin to speak responses
          </span>
        </div>
        <button
          className={`w-14 h-7 rounded-full p-1 transition-all duration-300 ${
            settings.enabled ? "bg-violet-500" : "bg-zinc-700"
          }`}
          onClick={() => onChange("enabled", !settings.enabled)}
          type="button"
          aria-pressed={settings.enabled}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
              settings.enabled ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Voice</span>
          <span className="text-zinc-500 text-sm">
            Select a voice for Lumin
          </span>
        </div>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.voice}
          onChange={(e) => onChange("voice", e.target.value)}
          disabled={!settings.enabled}
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Speed</span>
          <span className="text-zinc-500 text-sm">
            Adjust speaking rate ({settings.speed}x)
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={settings.speed}
          onChange={(e) => onChange("speed", parseFloat(e.target.value))}
          disabled={!settings.enabled}
          className="w-48 accent-violet-500"
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Pitch</span>
          <span className="text-zinc-500 text-sm">
            Adjust voice pitch ({settings.pitch})
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={settings.pitch}
          onChange={(e) => onChange("pitch", parseFloat(e.target.value))}
          disabled={!settings.enabled}
          className="w-48 accent-violet-500"
        />
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <div>
          <span className="text-zinc-300 block">Auto-play responses</span>
          <span className="text-zinc-500 text-sm">
            Automatically speak Lumin&apos;s responses
          </span>
        </div>
        <button
          className={`w-14 h-7 rounded-full p-1 transition-all duration-300 ${
            settings.autoPlay ? "bg-violet-500" : "bg-zinc-700"
          }`}
          onClick={() => onChange("autoPlay", !settings.autoPlay)}
          type="button"
          aria-pressed={settings.autoPlay}
          disabled={!settings.enabled}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
              settings.autoPlay ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="mt-8 p-4 bg-violet-500/10 rounded-lg border border-violet-500/20">
        <h3 className="text-violet-400 font-medium mb-2">Test Speech</h3>
        <p className="text-zinc-400 text-sm mb-4">
          Click the button below to test your current speech settings
        </p>
        <button
          className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
          onClick={() => {
            if ("speechSynthesis" in window && settings.enabled) {
              const utterance = new SpeechSynthesisUtterance(
                "Hello! I'm Lumin AI, your intelligent assistant."
              );
              utterance.voice = voices.find((v) => v.name === settings.voice);
              utterance.rate = settings.speed;
              utterance.pitch = settings.pitch;
              window.speechSynthesis.speak(utterance);
            }
          }}
          disabled={!settings.enabled}
        >
          Test Voice
        </button>
      </div>
    </div>
  );
};

SpeechSettings.propTypes = {
  settings: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    voice: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
    pitch: PropTypes.number.isRequired,
    autoPlay: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SpeechSettings;
