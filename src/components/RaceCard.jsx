import { Trophy, Clock, Calendar, Route, Shirt } from "lucide-react";

function RaceCard({ title, race, icon, accentColor, isEmpty = false }) {
    const IconComponent = icon;

    // Utiliser le nom de couleur passé ou le déduire de la couleur hex
    const dossardColorName =
        race.colorName || (race.color === "#ffffff" ? "Blanc" : "Couleur");

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-3 shadow-2xl border-2 border-gray-700 hover:border-gray-600 transition-all h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <div
                    className="w-1 h-8 rounded-full shadow-lg"
                    style={{ backgroundColor: race.color }}
                ></div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <IconComponent
                            className={`w-4 h-4 ${accentColor} flex-shrink-0`}
                        />
                        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wide truncate">
                            {title}
                        </h2>
                    </div>
                    <div
                        className="h-0.5 w-12 rounded-full mt-0.5"
                        style={{ backgroundColor: race.color }}
                    ></div>
                </div>
            </div>

            {isEmpty ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500 text-center italic text-sm">
                        Aucune course
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-start gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-gray-400 text-[10px] uppercase tracking-wide">
                                Catégorie
                            </p>
                            <p className="text-white text-base font-bold mt-0.5 truncate leading-tight">
                                {race.category || "-"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-gray-400 text-[10px] uppercase tracking-wide">
                                Année
                            </p>
                            <p className="text-white text-sm font-semibold mt-0.5 truncate leading-tight">
                                {race.year || "-"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-1.5">
                        <Clock
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: race.color }}
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-gray-400 text-[10px] uppercase tracking-wide">
                                Départ
                            </p>
                            <p
                                className="text-white text-lg font-bold mt-0.5 tabular-nums truncate leading-tight"
                                style={{ color: race.color }}
                            >
                                {race.startTime || "-"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-1.5">
                        <Route className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-gray-400 text-[10px] uppercase tracking-wide">
                                Distance
                            </p>
                            <p className="text-white text-sm font-semibold mt-0.5 truncate leading-tight">
                                {race.distance || "-"}
                            </p>
                        </div>
                    </div>

                    {/* Section Dossards compacte */}
                    <div className="col-span-2 flex items-center gap-2 mt-0.5 bg-gray-800/50 rounded-lg p-2 border border-gray-700">
                        <Shirt
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: race.color }}
                        />
                        <p className="text-gray-400 text-[10px] uppercase tracking-wide">
                            Dossards
                        </p>
                        <div className="flex items-center gap-1.5 ml-auto">
                            <div
                                className="w-5 h-5 rounded border-2 flex-shrink-0"
                                style={{
                                    backgroundColor: race.color,
                                    borderColor:
                                        race.color === "#ffffff"
                                            ? "#4b5563"
                                            : race.color,
                                }}
                            ></div>
                            <p className="text-white font-semibold text-sm truncate">
                                {dossardColorName}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RaceCard;
