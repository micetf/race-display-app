import { getMedalStyle } from "../utils/medalStyles";

function PodiumItem({ item }) {
    const medal = getMedalStyle(item.position);

    return (
        <div
            className={`border-2 ${medal.border} rounded-lg p-3 bg-gray-800/70 backdrop-blur ${medal.glow} hover:scale-105 transition-transform`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`bg-gradient-to-br ${medal.gradient} min-w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white ${medal.shadow} shadow-lg flex-shrink-0`}
                >
                    {item.position}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-base truncate">
                        {item.name}
                    </p>
                    <p
                        className={`font-mono text-sm font-semibold ${medal.text}`}
                    >
                        {item.time || "-"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PodiumItem;
