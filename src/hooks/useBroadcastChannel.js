import { useEffect, useRef } from "react";

/**
 * Hook personnalisé pour gérer la communication entre onglets
 * via l'API BroadcastChannel
 */
export const useBroadcastChannel = (channelName, onMessage) => {
    const channelRef = useRef(null);

    useEffect(() => {
        // Créer le canal de communication
        channelRef.current = new BroadcastChannel(channelName);

        // Écouter les messages
        if (onMessage) {
            channelRef.current.onmessage = (event) => {
                onMessage(event.data);
            };
        }

        // Nettoyer à la destruction du composant
        return () => {
            if (channelRef.current) {
                channelRef.current.close();
            }
        };
    }, [channelName, onMessage]);

    // Fonction pour envoyer un message
    const sendMessage = (data) => {
        if (channelRef.current) {
            channelRef.current.postMessage(data);
        }
    };

    return { sendMessage };
};
