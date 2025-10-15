// src/components/modes/MusicModePanel.jsx
import MusicSelector from "../MusicSelector";

function MusicModePanel({ currentMusic, onMusicControl }) {
    return (
        <>
            <MusicSelector
                onMusicControl={onMusicControl}
                currentMusic={currentMusic}
            />
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-800 flex items-start gap-2">
                    <span>💡</span>
                    <span>
                        Sélectionnez une musique pour la démarrer. Pour
                        l'arrêter, utilisez le bouton{" "}
                        <strong>"⏸️ Stop musique"</strong> en haut à droite.
                    </span>
                </p>
            </div>
        </>
    );
}

export default MusicModePanel;
