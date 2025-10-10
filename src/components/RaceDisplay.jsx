import { Trophy, Clock, Calendar, Route, Flag } from "lucide-react";

function RaceDisplay({ data }) {
    const { currentRace, nextRace, podiumCourse, podium } = data;

    // Par défaut, si podiumCourse n'est pas défini, utiliser currentRace
    const displayPodiumCourse = podiumCourse || currentRace;

    const RaceCard = ({ title, race, icon: Icon, accentColor }) => (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 shadow-2xl border-2 border-gray-700 hover:border-gray-600 transition-all h-full flex flex-col">
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="w-1.5 h-10 rounded-full shadow-lg"
                    style={{ backgroundColor: race.color }}
                ></div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Icon
                            className={`w-5 h-5 ${accentColor} flex-shrink-0`}
                        />
                        <h2 className="text-lg font-bold text-gray-300 uppercase tracking-wide truncate">
                            {title}
                        </h2>
                    </div>
                    <div
                        className="h-0.5 w-16 rounded-full"
                        style={{ backgroundColor: race.color }}
                    ></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                            Catégorie
                        </p>
                        <p className="text-white text-xl font-bold mt-0.5 truncate">
                            {race.category || "-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                            Année
                        </p>
                        <p className="text-white text-lg font-semibold mt-0.5 truncate">
                            {race.year || "-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Clock
                        className="w-5 h-5 mt-1 flex-shrink-0"
                        style={{ color: race.color }}
                    />
                    <div className="min-w-0 flex-1">
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                            Départ
                        </p>
                        <p
                            className="text-white text-2xl font-bold mt-0.5 tabular-nums truncate"
                            style={{ color: race.color }}
                        >
                            {race.startTime || "-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Route className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                            Distance
                        </p>
                        <p className="text-white text-lg font-semibold mt-0.5 truncate">
                            {race.distance || "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex flex-col">
            <div className="w-full h-full flex flex-col">
                {/* Titre principal */}
                <div className="text-center mb-4">
                    <div className="inline-block mb-1">
                        <Flag className="w-10 h-10 text-blue-500 mx-auto" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                        CROSS SCOLAIRE D'ANNONAY
                    </h1>
                    <p className="text-lg text-gray-400 font-semibold">
                        16 OCTOBRE 2025
                    </p>
                    <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mt-1"></div>
                </div>

                {/* Zone principale */}
                <div className="flex-1 flex gap-4 min-h-0">
                    {/* Colonne gauche : Course en cours + Prochain départ (1/3) */}
                    <div className="w-1/3 flex flex-col gap-4">
                        <div className="flex-1">
                            <RaceCard
                                title="Course en cours"
                                race={currentRace}
                                icon={Flag}
                                accentColor="text-green-400"
                            />
                        </div>

                        <div className="flex-1">
                            <RaceCard
                                title="Prochain départ"
                                race={nextRace}
                                icon={Clock}
                                accentColor="text-orange-400"
                            />
                        </div>
                    </div>

                    {/* Colonne droite : Podium (2/3) */}
                    <div className="w-2/3 flex flex-col min-h-0">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 shadow-2xl border-2 border-amber-500/30 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <Trophy className="w-7 h-7 text-amber-400" />
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-300 uppercase tracking-wide">
                                            Podium
                                        </h2>
                                        <div className="h-0.5 w-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mt-1"></div>
                                    </div>
                                </div>

                                {/* Information de la course du podium */}
                                <div className="bg-gray-800/70 rounded-lg px-4 py-2 border border-amber-500/20">
                                    <p className="text-amber-400 font-semibold text-base">
                                        {displayPodiumCourse.category} -{" "}
                                        {displayPodiumCourse.year}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {displayPodiumCourse.startTime} •{" "}
                                        {displayPodiumCourse.distance}
                                    </p>
                                </div>
                            </div>

                            {/* Podium en grille adaptative SANS SCROLL */}
                            <div className="flex-1 flex items-center justify-center">
                                {podium.filter(
                                    (item) => item.name.trim() !== ""
                                ).length > 0 ? (
                                    <div
                                        className={`grid gap-3 w-full ${
                                            podium.filter(
                                                (item) =>
                                                    item.name.trim() !== ""
                                            ).length <= 6
                                                ? "grid-cols-1"
                                                : "grid-cols-2"
                                        }`}
                                    >
                                        {podium
                                            .filter(
                                                (item) =>
                                                    item.name.trim() !== ""
                                            )
                                            .map((item, index) => {
                                                const medals = {
                                                    1: {
                                                        gradient:
                                                            "from-yellow-400 to-amber-500",
                                                        shadow: "shadow-yellow-500/50",
                                                        text: "text-amber-400",
                                                        border: "border-amber-400",
                                                        glow: "shadow-lg shadow-yellow-400/30",
                                                    },
                                                    2: {
                                                        gradient:
                                                            "from-gray-300 to-gray-400",
                                                        shadow: "shadow-gray-400/50",
                                                        text: "text-gray-300",
                                                        border: "border-gray-300",
                                                        glow: "shadow-lg shadow-gray-300/30",
                                                    },
                                                    3: {
                                                        gradient:
                                                            "from-orange-600 to-amber-700",
                                                        shadow: "shadow-orange-600/50",
                                                        text: "text-orange-400",
                                                        border: "border-orange-500",
                                                        glow: "shadow-lg shadow-orange-500/30",
                                                    },
                                                };

                                                const position = item.position;
                                                const medal = medals[
                                                    position
                                                ] || {
                                                    gradient:
                                                        "from-blue-500 to-blue-600",
                                                    shadow: "shadow-blue-500/50",
                                                    text: "text-blue-400",
                                                    border: "border-blue-500",
                                                    glow: "shadow-md shadow-blue-400/20",
                                                };

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`border-2 ${medal.border} rounded-lg p-3 bg-gray-800/70 backdrop-blur ${medal.glow} hover:scale-105 transition-transform`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`bg-gradient-to-br ${medal.gradient} min-w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white ${medal.shadow} shadow-lg flex-shrink-0`}
                                                            >
                                                                {position}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-white font-bold text-base truncate">
                                                                    {item.name}
                                                                </p>
                                                                <p
                                                                    className={`font-mono text-sm font-semibold ${medal.text}`}
                                                                >
                                                                    {item.time ||
                                                                        "-"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-500">
                                        Aucun résultat pour le moment
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de statut */}
                <div className="mt-3 bg-gray-900/50 backdrop-blur border-2 border-gray-700 rounded-xl p-2.5 flex items-center justify-center gap-3">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                    <p className="text-gray-300 font-semibold tracking-wide text-sm">
                        AFFICHAGE ACTIF - SYNCHRONISÉ
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RaceDisplay;
