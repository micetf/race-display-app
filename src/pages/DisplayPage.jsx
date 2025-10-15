import { useState, useCallback } from "react";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import ImageDisplay from "../components/ImageDisplay";
import RaceDisplay from "../components/RaceDisplay";
import MusicCredit from "../components/MusicCredit";

function DisplayPage() {
    // État composé et persistant
    const [displayState, setDisplayState] = useState({
        image: null, // { url: "..." }
        currentRace: null, // { category, year, distance, color, colorName, startTime }
        nextRace: null,
        podiumCourse: null,
        podium: null, // [{ position, name, time, school }]
    });

    const [musicControl, setMusicControl] = useState(null);

    const handleMessage = useCallback((message) => {
        console.log("Message reçu:", message);

        // Gérer les messages de musique séparément
        if (message.type === "music") {
            setMusicControl(message.data);
        }
        // Mise à jour partielle de l'état d'affichage
        else if (message.type === "update") {
            setDisplayState((prev) => ({
                ...prev,
                ...message.data,
            }));
        }
        // Pour compatibilité avec l'ancien système (si nécessaire)
        else if (message.type === "image") {
            setDisplayState((prev) => ({
                ...prev,
                image: message.data,
            }));
        } else if (message.type === "race") {
            setDisplayState((prev) => ({
                ...prev,
                currentRace: message.data.currentRace,
                nextRace: message.data.nextRace,
                podiumCourse: message.data.podiumCourse,
                podium: message.data.podium,
            }));
        }
    }, []);

    useBroadcastChannel("race-display", handleMessage);

    const { isPlaying, currentMusic } = useAudioPlayer(musicControl);

    // Décider quoi afficher selon l'état
    const showImage = displayState.image !== null;

    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
            {/* Crédits musicaux en mode floating (sur l'image) */}
            {showImage && (
                <MusicCredit
                    music={currentMusic}
                    isPlaying={isPlaying}
                    variant="floating"
                />
            )}

            {/* Contenu principal */}
            <div
                className="w-full h-full relative"
                style={{
                    aspectRatio: "16/9",
                    maxHeight: "100vh",
                    maxWidth: "177.78vh",
                }}
            >
                {/* Affichage de l'image */}
                {showImage && <ImageDisplay url={displayState.image.url} />}

                {/* Affichage des informations de course et podium (quand l'image n'est pas affichée) */}
                {!showImage && (
                    <RaceDisplay
                        data={{
                            currentRace: displayState.currentRace,
                            nextRace: displayState.nextRace,
                            podiumCourse: displayState.podiumCourse,
                            podium: displayState.podium || [],
                        }}
                        currentMusic={currentMusic}
                        isPlaying={isPlaying}
                    />
                )}
            </div>
        </div>
    );
}

export default DisplayPage;
