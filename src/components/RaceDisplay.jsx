import { Flag, Clock } from "lucide-react";
import RaceCard from "./RaceCard";
import PodiumCard from "./PodiumCard";
import DisplayHeader from "./DisplayHeader";
import StatusBar from "./StatusBar";
import MusicCredit from "./MusicCredit";

function RaceDisplay({ data, currentMusic, isPlaying }) {
    const { currentRace, nextRace, podiumCourse, podium } = data;

    // Déterminer ce qui doit être affiché
    const hasCurrentRace = currentRace !== null;
    const hasNextRace = nextRace !== null;
    const hasPodium =
        podiumCourse !== null &&
        podium &&
        podium.length > 0 &&
        podium.some((p) => p.name.trim() !== "");

    // Créer des objets vides pour l'affichage
    const emptyRace = {
        category: "-",
        year: "-",
        distance: "-",
        color: "#6b7280",
        colorName: "Gris",
        startTime: "-",
    };

    const displayCurrentRace = currentRace || emptyRace;
    const displayNextRace = nextRace || emptyRace;

    return (
        <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 flex flex-col">
            <div className="w-full h-full flex flex-col">
                <DisplayHeader />

                {/* Zone principale - layout 1/3 + 2/3 */}
                <div className="flex-1 flex gap-3 min-h-0">
                    {/* Colonne gauche : Courses (1/3) */}
                    <div className="w-1/3 flex flex-col gap-3">
                        <div className="flex-1">
                            <RaceCard
                                title="Course en cours"
                                race={displayCurrentRace}
                                icon={Flag}
                                accentColor="text-green-400"
                                isEmpty={!hasCurrentRace}
                            />
                        </div>

                        <div className="flex-1">
                            <RaceCard
                                title="Prochain départ"
                                race={displayNextRace}
                                icon={Clock}
                                accentColor="text-orange-400"
                                isEmpty={!hasNextRace}
                            />
                        </div>
                    </div>

                    {/* Colonne droite : Podium (2/3) */}
                    <div className="w-2/3 flex flex-col min-h-0">
                        {hasPodium ? (
                            <PodiumCard
                                podiumCourse={podiumCourse}
                                podium={podium}
                            />
                        ) : (
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 shadow-2xl border-2 border-gray-700 h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🏆</div>
                                    <p className="text-gray-400 text-lg font-medium">
                                        Aucun podium à afficher
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        En attente des résultats
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer avec StatusBar et crédit musique inline */}
                <div className="mt-2 space-y-2">
                    <MusicCredit
                        music={currentMusic}
                        isPlaying={isPlaying}
                        variant="inline"
                    />
                    <StatusBar />
                </div>
            </div>
        </div>
    );
}

export default RaceDisplay;
