import { useEffect, useRef, useState } from "react";
import { musiquesById } from "../data/musiques";

/**
 * Hook personnalisé pour gérer la lecture audio
 * Sépare la logique audio de l'affichage des crédits
 */
export const useAudioPlayer = (musicControl) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusic, setCurrentMusic] = useState(null);

    useEffect(() => {
        if (!musicControl) return;

        console.log("useAudioPlayer - Contrôle reçu:", musicControl);

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

            // Événements
            audio.addEventListener("loadeddata", () => {
                console.log("Audio chargé:", music.titre);
            });

            audio.addEventListener("error", (e) => {
                console.error("Erreur de chargement audio:", e);
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

    // Nettoyage au démontage
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return { isPlaying, currentMusic };
};
