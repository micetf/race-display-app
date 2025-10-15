import { Trophy } from "lucide-react";
import PodiumItem from "./PodiumItem";
import { getEcoleNom } from "../data/ecoles";

function PodiumCard({ podiumCourse, podium }) {
    const filledPodium = podium.filter((item) => item.name.trim() !== "");
    const hasPodium = filledPodium.length > 0;

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-responsive-lg spacing-md shadow-2xl border-responsive-thick border-amber-500/30 h-full flex flex-col">
            {/* Header du podium */}
            <div className="flex items-center justify-between mb-responsive-md">
                <div className="flex items-center gap-responsive-sm">
                    <Trophy className="icon-md text-amber-400" />
                    <div>
                        <h2 className="text-responsive-md font-bold text-gray-300 uppercase tracking-wide">
                            Podium
                        </h2>
                        <div
                            className="rounded-full mt-responsive-sm"
                            style={{
                                height: "0.3vh",
                                width: "5vw",
                                background:
                                    "linear-gradient(to right, rgb(251, 191, 36), rgb(234, 179, 8))",
                            }}
                        ></div>
                    </div>
                </div>

                {/* Information de la course du podium */}
                <div className="bg-gray-800/70 rounded-responsive-md spacing-sm border-responsive-thin border-amber-500/20">
                    <p className="text-amber-400 font-semibold text-responsive-sm leading-tight">
                        {podiumCourse.category} - {podiumCourse.year}
                    </p>
                    <p className="text-gray-400 text-responsive-xs leading-tight mt-responsive-sm">
                        {podiumCourse.startTime} • {podiumCourse.distance}
                    </p>
                </div>
            </div>

            {/* Podium en grille adaptative avec scroll si nécessaire */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                {hasPodium ? (
                    <div
                        className={`w-full podium-scrollable ${
                            filledPodium.length <= 6
                                ? "grid gap-responsive-md grid-cols-1"
                                : "grid gap-responsive-sm grid-cols-2"
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
                    <div className="text-center spacing-lg text-gray-500">
                        <div className="text-responsive-2xl mb-responsive-md">
                            🏆
                        </div>
                        <p className="text-responsive-md">
                            Aucun résultat pour le moment
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PodiumCard;
