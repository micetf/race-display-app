import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { musiquesById } from "../data/musiques";

function MusicSelector({ onMusicControl }) {
    const musicList = Object.values(musiquesById);

    const handlePlayMusic = (musicId) => {
        onMusicControl({
            action: "play",
            musicId: musicId,
        });
    };

    const handleStopMusic = () => {
        onMusicControl({
            action: "stop",
        });
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center gap-2 mb-4">
                <Music className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-lg text-gray-900">
                    Musique de Fond
                </h3>
            </div>

            <div className="space-y-2">
                {musicList.map((music) => (
                    <div
                        key={music.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                                {music.titre}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                                {music.auteur}
                            </p>
                        </div>
                        <button
                            onClick={() => handlePlayMusic(music.id)}
                            className="ml-3 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            title="Lire cette musique"
                        >
                            <Play className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                    onClick={handleStopMusic}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                    <Pause className="w-4 h-4" />
                    Arrêter la musique
                </button>
            </div>

            <div className="mt-3 text-xs text-gray-500 space-y-1">
                <p>💡 La musique jouera en boucle sur l'affichage</p>
                <p>📜 Toutes les musiques sont sous licence Creative Commons</p>
            </div>
        </div>
    );
}

export default MusicSelector;
