import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCouleurHex } from "../data/courses";

function RaceNavigation({
    currentIndex,
    coursesLength,
    currentCourse,
    nextCourse,
    eventStatus,
    onPrevious,
    onNext,
}) {
    return (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={onPrevious}
                    disabled={currentIndex === -1}
                    className="p-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="text-center flex-1">
                    {eventStatus === "before" && (
                        <>
                            <p className="text-sm text-gray-600 mb-1">
                                Avant le début
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Événement non démarré
                            </h3>
                            <p className="text-indigo-600 font-semibold mt-1">
                                Première course : {nextCourse?.depart}
                            </p>
                        </>
                    )}
                    {eventStatus === "running" && (
                        <>
                            <p className="text-sm text-gray-600 mb-1">
                                Course {currentIndex + 1} / {coursesLength}
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {currentCourse.categorie} -{" "}
                                {currentCourse.annee}
                            </h3>
                            <p className="text-indigo-600 font-semibold mt-1">
                                Départ : {currentCourse.depart}
                            </p>
                        </>
                    )}
                    {eventStatus === "after" && (
                        <>
                            <p className="text-sm text-gray-600 mb-1">
                                Événement terminé
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Toutes les courses terminées
                            </h3>
                            <p className="text-green-600 font-semibold mt-1">
                                ✓ {coursesLength} courses complétées
                            </p>
                        </>
                    )}
                </div>

                <button
                    onClick={onNext}
                    disabled={currentIndex === coursesLength}
                    className="p-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {eventStatus === "running" && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3">
                        <p className="text-gray-600">Distance</p>
                        <p className="font-semibold">
                            {currentCourse.distance}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                        <p className="text-gray-600">Couleur</p>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded border border-gray-300"
                                style={{
                                    backgroundColor: getCouleurHex(
                                        currentCourse.couleur
                                    ),
                                }}
                            ></div>
                            <p className="font-semibold">
                                {currentCourse.couleur}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RaceNavigation;
