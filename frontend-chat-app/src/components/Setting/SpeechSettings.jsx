import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SpeechSettings = ({ settings, onChange }) => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
    updateVoices();

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  const handleTestVoice = () => {
    const utterance = new SpeechSynthesisUtterance(
      "This is a test of the speech settings."
    );
    utterance.voice =
      voices.find((voice) => voice.name === settings.voice) || null;
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    utterance.volume = settings.volume;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Voice</span>
        <select
          className="bg-zinc-800/50 border border-violet-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 transition-all duration-200"
          value={settings.voice}
          onChange={(e) => onChange("voice", e.target.value)}
        >
          <option value="default">Default</option>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Pitch</span>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.pitch}
            onChange={(e) => onChange("pitch", parseFloat(e.target.value))}
            className="w-32 accent-violet-500"
          />
          <span className="w-12 text-right text-zinc-400">
            {settings.pitch.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Rate</span>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.rate}
            onChange={(e) => onChange("rate", parseFloat(e.target.value))}
            className="w-32 accent-violet-500"
          />
          <span className="w-12 text-right text-zinc-400">
            {settings.rate.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 hover:bg-white/5 rounded-lg transition-all duration-200">
        <span className="text-zinc-300">Volume</span>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.volume}
            onChange={(e) => onChange("volume", parseFloat(e.target.value))}
            className="w-32 accent-violet-500"
          />
          <span className="w-12 text-right text-zinc-400">
            {(settings.volume * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={handleTestVoice}
          className="px-6 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-all duration-200"
        >
          Test Speech
        </button>
      </div>
    </div>
  );
};

SpeechSettings.propTypes = {
  settings: PropTypes.shape({
    voice: PropTypes.string.isRequired,
    pitch: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SpeechSettings;
