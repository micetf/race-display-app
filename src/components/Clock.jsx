import { useState, useEffect } from "react";
import { Clock as ClockIcon } from "lucide-react";

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Mettre à jour l'heure toutes les secondes
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Nettoyage de l'intervalle au démontage
        return () => clearInterval(timer);
    }, []);

    // Formater l'heure (HH:MM:SS)
    const formatTime = (date) => {
        return date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <div className="fixed top-4 left-4 bg-gray-900/95 backdrop-blur border-2 border-blue-500/50 rounded-xl px-6 py-3 shadow-2xl z-50">
            <div className="flex items-center gap-3">
                <ClockIcon className="w-6 h-6 text-blue-400" />
                <span className="text-white font-bold text-2xl tabular-nums">
                    {formatTime(time)}
                </span>
            </div>
        </div>
    );
}

export default Clock;
