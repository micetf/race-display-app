import { getMedalStyle } from "../utils/medalStyles";

function PodiumItem({ item }) {
    const medal = getMedalStyle(item.position);

    return (
        <div
            className={`border-responsive-thick ${medal.border} rounded-responsive-md spacing-md bg-gray-800/70 backdrop-blur ${medal.glow} hover:scale-105 transition-transform`}
        >
            <div className="flex items-center gap-responsive-md">
                {/* Médaille avec position */}
                <div
                    className={`bg-gradient-to-br ${medal.gradient} medal-circle rounded-full flex items-center justify-center font-black text-white ${medal.shadow} shadow-lg flex-shrink-0`}
                >
                    {item.position}
                </div>

                {/* Nom et école */}
                <div className="flex-1 min-w-0 flex flex-col gap-responsive-xs">
                    <p className="text-white font-bold text-responsive-base truncate">
                        {item.name}
                    </p>
                    {item.schoolName && (
                        <p className="text-gray-400 font-normal text-responsive-xs truncate">
                            {item.schoolName}
                        </p>
                    )}
                </div>

                {/* Temps - TAILLE AUGMENTÉE */}
                <p
                    className={`font-mono text-responsive-lg font-bold ${medal.text} whitespace-nowrap ml-auto tabular-nums`}
                >
                    {item.time || "-"}
                </p>
            </div>
        </div>
    );
}

export default PodiumItem;
