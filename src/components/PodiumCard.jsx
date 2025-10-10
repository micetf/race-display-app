import { Trophy } from "lucide-react";
import PodiumItem from "./PodiumItem";
import { getEcoleNom } from "../data/ecoles";

function PodiumCard({ podiumCourse, podium }) {
    const filledPodium = podium.filter((item) => item.name.trim() !== "");
    const hasPodium = filledPodium.length > 0;

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-2.5 shadow-2xl border-2 border-amber-500/30 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <div>
                        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wide">
                            Podium
                        </h2>
                        <div className="h-0.5 w-10 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mt-0.5"></div>
                    </div>
                </div>

                {/* Information de la course du podium */}
                <div className="bg-gray-800/70 rounded-lg px-2.5 py-1 border border-amber-500/20">
                    <p className="text-amber-400 font-semibold text-xs leading-tight">
                        {podiumCourse.category} - {podiumCourse.year}
                    </p>
                    <p className="text-gray-400 text-[9px] leading-tight mt-0.5">
                        {podiumCourse.startTime} • {podiumCourse.distance}
                    </p>
                </div>
            </div>

            {/* Podium en grille adaptative */}
            <div className="flex-1 flex items-center justify-center overflow-y-auto">
                {hasPodium ? (
                    <div
                        className={`grid gap-1.5 w-full ${
                            filledPodium.length <= 6
                                ? "grid-cols-1"
                                : "grid-cols-2"
                        }`}
                    >
                        {filledPodium.map((item, index) => (
                            <PodiumItem
                                key={index}
                                item={{
                                    ...item,
                                    schoolName: item.school
                                        ? getEcoleNom(item.school)
                                        : "",
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                        Aucun résultat pour le moment
                    </div>
                )}
            </div>
        </div>
    );
}

export default PodiumCard;
