import { Trophy, Clock, Calendar, Route } from "lucide-react";

function RaceCard({ title, race, icon, accentColor, isEmpty = false }) {
    const IconComponent = icon;
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 shadow-2xl border-2 border-gray-700 hover:border-gray-600 transition-all h-full flex flex-col">
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="w-1.5 h-10 rounded-full shadow-lg"
                    style={{ backgroundColor: race.color }}
                ></div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <IconComponent
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

            {isEmpty ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500 text-center italic">
                        Aucune course
                    </p>
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default RaceCard;
