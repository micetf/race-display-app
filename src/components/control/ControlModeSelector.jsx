// src/components/control/ControlModeSelector.jsx

const MODES = [
    { id: "image", label: "🖼️ Image", name: "Image" },
    { id: "race", label: "🏁 Courses", name: "Courses" },
    { id: "podium", label: "🏆 Podiums", name: "Podiums" },
    { id: "music", label: "🎵 Musique", name: "Musique" },
];

function ControlModeSelector({ currentMode, onModeChange }) {
    return (
        <div className="flex gap-2 flex-wrap">
            {MODES.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => onModeChange(mode.id)}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                        currentMode === mode.id
                            ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                    }`}
                    aria-label={`Mode ${mode.name}`}
                >
                    {mode.label}
                </button>
            ))}
        </div>
    );
}

export default ControlModeSelector;
