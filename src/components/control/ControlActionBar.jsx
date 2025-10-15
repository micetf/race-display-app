// src/components/control/ControlActionBar.jsx

function ControlActionBar({
    mode,
    imageDisplayed,
    currentMusic,
    onToggleImage,
    onUpdateRace,
    onUpdatePodium,
    onResetPodium,
    onResetAllPodiums,
    onStopMusic,
}) {
    const renderImageActions = () => (
        <>
            <button
                onClick={onToggleImage}
                className={`px-4 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg ${
                    imageDisplayed
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                }`}
            >
                {imageDisplayed ? "👁️ Masquer l'image" : "📺 Afficher l'image"}
            </button>
            {currentMusic && (
                <button
                    onClick={onStopMusic}
                    className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                    ⏸️ Stop musique
                </button>
            )}
        </>
    );

    const renderRaceActions = () => (
        <>
            <button
                id="btn-update-race"
                onClick={onUpdateRace}
                className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
                🚀 Envoyer sur l'écran
            </button>
            {currentMusic && (
                <button
                    onClick={onStopMusic}
                    className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                    ⏸️ Stop musique
                </button>
            )}
        </>
    );

    const renderPodiumActions = () => (
        <>
            <button
                id="btn-display-podium"
                onClick={onUpdatePodium}
                className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
                🏆 Envoyer sur l'écran
            </button>
            <button
                onClick={onResetPodium}
                className="px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
                🗑️ Effacer ce podium
            </button>
            <button
                onClick={onResetAllPodiums}
                className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
                🗑️ Tout effacer
            </button>
            {currentMusic && (
                <button
                    onClick={onStopMusic}
                    className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                    ⏸️ Stop musique
                </button>
            )}
        </>
    );

    return (
        <div className="flex gap-2 flex-wrap items-center">
            {mode === "image" && renderImageActions()}
            {mode === "race" && renderRaceActions()}
            {mode === "podium" && renderPodiumActions()}
        </div>
    );
}

export default ControlActionBar;
