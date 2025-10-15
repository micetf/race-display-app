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
        <div className="bg-gray-900/95 backdrop-blur border-blue-500/50 rounded-responsive-xl shadow-2xl clock-container">
            <div className="flex items-center gap-responsive-md">
                <ClockIcon className="clock-icon text-blue-400" />
                <span className="text-white font-bold clock-time tabular-nums">
                    {formatTime(time)}
                </span>
            </div>
        </div>
    );
}

export default Clock;
