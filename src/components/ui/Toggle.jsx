import PropTypes from "prop-types";

export const Toggle = ({ value, onChange }) => {
  return (
    <button
      className={`w-14 h-7 rounded-full p-1 transition-all duration-300 ${
        value ? "bg-violet-500" : "bg-zinc-700"
      }`}
      onClick={() => onChange(!value)}
      type="button"
      aria-pressed={value}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
          value ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );
};

Toggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
