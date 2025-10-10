import { useState, useCallback } from "react";

/**
 * Hook personnalisé pour gérer le contrôle de la musique
 * Permet de centraliser la logique de gestion de la musique de fond
 */
export const useMusicControl = () => {
    const [currentMusicControl, setCurrentMusicControl] = useState(null);

    /**
     * Envoyer une commande de contrôle musical
     * @param {Object} control - { action: "play" | "stop", musicId?: string }
     */
    const sendMusicControl = useCallback((control) => {
        console.log("useMusicControl - Envoi commande:", control);
        setCurrentMusicControl({
            ...control,
            timestamp: Date.now(), // Force la mise à jour
        });
    }, []);

    /**
     * Arrêter la musique en cours
     */
    const stopMusic = useCallback(() => {
        console.log("useMusicControl - Stop");
        sendMusicControl({ action: "stop" });
    }, [sendMusicControl]);

    /**
     * Jouer une musique spécifique
     * @param {string} musicId - ID de la musique à jouer
     */
    const playMusic = useCallback(
        (musicId) => {
            console.log("useMusicControl - Play:", musicId);
            sendMusicControl({ action: "play", musicId });
        },
        [sendMusicControl]
    );

    return {
        currentMusicControl,
        sendMusicControl,
        stopMusic,
        playMusic,
    };
};
