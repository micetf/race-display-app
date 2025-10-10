import { useEffect, useRef, useState } from "react";
import { Music, Volume2 } from "lucide-react";
import { musiquesById } from "../data/musiques";

function MusicPlayer({ musicControl }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusic, setCurrentMusic] = useState(null);

    useEffect(() => {
        if (!musicControl) return;

        console.log("MusicPlayer - Contrôle reçu:", musicControl);

        const { action, musicId } = musicControl;

        if (action === "play" && musicId) {
            const music = musiquesById[musicId];
            if (!music) {
                console.error("Musique non trouvée:", musicId);
                return;
            }

            console.log("Lecture de:", music.titre);

            // Arrêter la musique précédente
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current = null;
            }

            // Créer une nouvelle instance Audio
            const audioPath = `/musiques/${music.file}.mp3`;
            console.log("Chemin audio:", audioPath);

            const audio = new Audio(audioPath);
            audio.loop = true;
            audio.volume = 0.3;
            audioRef.current = audio;

            // Événements pour débugger
            audio.addEventListener("loadeddata", () => {
                console.log("Audio chargé:", music.titre);
            });

            audio.addEventListener("error", (e) => {
                console.error("Erreur de chargement audio:", e);
                console.error("Fichier:", audioPath);
                setIsPlaying(false);
                setCurrentMusic(null);
            });

            // Tenter la lecture
            audio
                .play()
                .then(() => {
                    console.log("Lecture démarrée:", music.titre);
                    setIsPlaying(true);
                    setCurrentMusic(music);
                })
                .catch((error) => {
                    console.error("Erreur lors de la lecture:", error);
                    console.error("Fichier:", audioPath);
                    setIsPlaying(false);
                    setCurrentMusic(null);
                });
        } else if (action === "stop") {
            console.log("Arrêt de la musique");
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current = null;
            }
            setIsPlaying(false);
            setCurrentMusic(null);
        }

        // Nettoyage
        return () => {
            if (audioRef.current && action === "stop") {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [musicControl]);

    // Nettoyage au démontage du composant
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    if (!isPlaying || !currentMusic) return null;

    return (
        <div className="fixed bottom-4 left-4 bg-gray-900/95 backdrop-blur border-2 border-purple-500/50 rounded-xl p-4 shadow-2xl max-w-lg z-50">
            <div className="flex items-start gap-3">
                <div className="relative">
                    <Music className="w-8 h-8 text-purple-400 animate-pulse" />
                    <div className="absolute inset-0 animate-ping">
                        <Music className="w-8 h-8 text-purple-400 opacity-75" />
                    </div>
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm truncate">
                                Titre : {currentMusic.titre}
                            </p>
                            <p className="text-gray-400 text-xs truncate">
                                Auteur : {currentMusic.auteur}
                            </p>
                        </div>
                        <Volume2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    </div>

                    {/* Crédit complet */}
                    <div className="text-[10px] text-gray-400 leading-relaxed space-y-0.5 border-t border-gray-700/50 pt-2">
                        <div>
                            <span className="font-medium">Source:</span>{" "}
                            <a
                                href={currentMusic.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                {currentMusic.source}
                            </a>
                        </div>
                        <div>
                            <span className="font-medium">Licence:</span>{" "}
                            <a
                                href={currentMusic.licence}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                {currentMusic.licence}
                            </a>{" "}
                        </div>
                        <div>
                            <span className="font-medium">Téléchargement:</span>{" "}
                            <a
                                href={currentMusic.telechargement}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                {currentMusic.telechargement}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
