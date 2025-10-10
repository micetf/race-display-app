import { useState, useCallback } from "react";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import ImageDisplay from "../components/ImageDisplay";
import RaceDisplay from "../components/RaceDisplay";
import MusicPlayer from "../components/MusicPlayer";
import Clock from "../components/Clock";

function DisplayPage() {
    const [content, setContent] = useState({
        type: null,
        data: null,
    });

    const [musicControl, setMusicControl] = useState(null);

    const handleMessage = useCallback((message) => {
        console.log("Message reçu:", message);

        // Gérer les messages de musique séparément
        if (message.type === "music") {
            setMusicControl(message.data);
        } else {
            // Messages d'affichage normaux (image, race)
            setContent(message);
        }
    }, []);

    useBroadcastChannel("race-display", handleMessage);

    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
            <Clock />
            {/* Lecteur de musique (position fixe) */}
            <MusicPlayer musicControl={musicControl} />

            {/* Contenu principal */}
            <div
                className="w-full h-full"
                style={{
                    aspectRatio: "16/9",
                    maxHeight: "100vh",
                    maxWidth: "177.78vh",
                }}
            >
                {!content.type && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-400 text-xl">
                                En attente du contenu...
                            </p>
                        </div>
                    </div>
                )}

                {content.type === "image" && (
                    <ImageDisplay url={content.data.url} />
                )}

                {content.type === "race" && <RaceDisplay data={content.data} />}
            </div>
        </div>
    );
}

export default DisplayPage;
