import { Trophy, Clock, Calendar, Route, Shirt } from "lucide-react";

function RaceCard({ title, race, icon, accentColor, isEmpty = false }) {
    const IconComponent = icon;

    const dossardColorName =
        race.colorName || (race.color === "#ffffff" ? "Blanc" : "Couleur");

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-responsive-lg spacing-md shadow-2xl border-responsive-thick border-gray-700 hover:border-gray-600 transition-all h-full flex flex-col">
            {/* Header avec barre de couleur */}
            <div className="flex items-center gap-responsive-sm mb-responsive-md">
                <div
                    className="color-bar rounded-full shadow-lg"
                    style={{ backgroundColor: race.color }}
                ></div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-responsive-xs">
                        <IconComponent
                            className={`icon-sm ${accentColor} flex-shrink-0`}
                        />
                        <h2 className="text-responsive-sm font-bold text-gray-300 uppercase tracking-wide truncate">
                            {title}
                        </h2>
                    </div>
                    <div
                        className="h-[0.3vh] rounded-full mt-responsive-sm"
                        style={{
                            backgroundColor: race.color,
                            width: "5vw",
                        }}
                    ></div>
                </div>
            </div>

            {isEmpty ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500 text-center italic text-responsive-sm">
                        Aucune course
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-responsive-md">
                    {/* Catégorie */}
                    <div className="flex items-start gap-responsive-xs">
                        <Trophy className="icon-sm text-amber-400 mt-[0.5vh] flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-gray-400 text-responsive-xs uppercase tracking-wide">
                                Catégorie
                            </p>
                            <p className="text-white text-responsive-md font-bold mt-responsive-sm truncate leading-tight">
                                {race.category || "-"}
                            </p>
                        </div>
                    </div>

                    {/* Année */}
                    <div className="flex items-start gap-responsive-xs">
                        <Calendar className="icon-sm text-blue-400 mt-[0.5vh] flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-gray-400 text-responsive-xs uppercase tracking-wide">
                                Année
                            </p>
                            <p className="text-white text-responsive-sm font-semibold mt-responsive-sm truncate leading-tight">
                                {race.year || "-"}
                            </p>
                        </div>
                    </div>

                    {/* Départ - TAILLE AUGMENTÉE */}
                    <div className="flex items-start gap-responsive-xs">
                        <Clock
                            className="icon-md mt-[0.5vh] flex-shrink-0"
                            style={{ color: race.color }}
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-gray-400 text-responsive-xs uppercase tracking-wide">
                                Départ
                            </p>
                            <p
                                className="text-white text-responsive-lg font-bold mt-responsive-sm tabular-nums truncate leading-tight"
                                style={{ color: race.color }}
                            >
                                {race.startTime || "-"}
                            </p>
                        </div>
                    </div>

                    {/* Distance */}
                    <div className="flex items-start gap-responsive-xs">
                        <Route className="icon-sm text-green-400 mt-[0.5vh] flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-gray-400 text-responsive-xs uppercase tracking-wide">
                                Distance
                            </p>
                            <p className="text-white text-responsive-sm font-semibold mt-responsive-sm truncate leading-tight">
                                {race.distance || "-"}
                            </p>
                        </div>
                    </div>

                    {/* Dossards - Section compacte */}
                    <div className="col-span-2 flex items-center gap-responsive-sm mt-responsive-sm bg-gray-800/50 rounded-responsive-md spacing-sm border-responsive-thin border-gray-700">
                        <Shirt
                            className="icon-sm flex-shrink-0"
                            style={{ color: race.color }}
                        />
                        <p className="text-gray-400 text-responsive-xs uppercase tracking-wide">
                            Dossards
                        </p>
                        <div className="flex items-center gap-responsive-xs ml-auto">
                            <div
                                className="dossard-indicator rounded border-responsive-normal flex-shrink-0"
                                style={{
                                    backgroundColor: race.color,
                                    borderColor:
                                        race.color === "#ffffff"
                                            ? "#4b5563"
                                            : race.color,
                                }}
                            ></div>
                            <p className="text-white font-semibold text-responsive-sm truncate">
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
