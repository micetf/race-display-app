import { getMedalStyle } from "../utils/medalStyles";

function PodiumItem({ item }) {
    const medal = getMedalStyle(item.position);

    return (
        <div
            className={`border-2 ${medal.border} rounded-lg p-2 bg-gray-800/70 backdrop-blur ${medal.glow} hover:scale-105 transition-transform`}
        >
            <div className="flex items-center gap-2.5">
                <div
                    className={`bg-gradient-to-br ${medal.gradient} min-w-8 h-8 rounded-full flex items-center justify-center font-black text-base text-white ${medal.shadow} shadow-lg flex-shrink-0`}
                >
                    {item.position}
                </div>
                <div className="flex-1 min-w-0 flex items-baseline gap-2">
                    <p className="text-white font-bold text-sm truncate">
                        {item.name}
                        {item.schoolName && (
                            <span className="text-gray-400 font-normal text-xs ml-1.5">
                                ({item.schoolName})
                            </span>
                        )}
                    </p>
                    <p
                        className={`font-mono text-sm font-bold ${medal.text} whitespace-nowrap ml-auto`}
                    >
                        {item.time || "-"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PodiumItem;
