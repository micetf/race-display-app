import { Flag, Clock } from "lucide-react";
import RaceCard from "./RaceCard";
import PodiumCard from "./PodiumCard";
import DisplayHeader from "./DisplayHeader";
import StatusBar from "./StatusBar";

function RaceDisplay({ data }) {
    const { currentRace, nextRace, podiumCourse, podium } = data;

    // Par défaut, si podiumCourse n'est pas défini, utiliser currentRace
    const displayPodiumCourse = podiumCourse || currentRace;

    return (
        <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex flex-col">
            <div className="w-full h-full flex flex-col">
                <DisplayHeader />

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
                                isEmpty={currentRace.category === "-"}
                            />
                        </div>

                        <div className="flex-1">
                            <RaceCard
                                title="Prochain départ"
                                race={nextRace}
                                icon={Clock}
                                accentColor="text-orange-400"
                                isEmpty={nextRace.category === "-"}
                            />
                        </div>
                    </div>

                    {/* Colonne droite : Podium (2/3) */}
                    <div className="w-2/3 flex flex-col min-h-0">
                        <PodiumCard
                            podiumCourse={displayPodiumCourse}
                            podium={podium}
                        />
                    </div>
                </div>

                <StatusBar />
            </div>
        </div>
    );
}

export default RaceDisplay;
