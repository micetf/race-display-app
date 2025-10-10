import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
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
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-6">
            {/* Horloge actuelle */}
            <div className="flex items-center justify-center gap-2 mb-4 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200 max-w-fit mx-auto">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-600 text-sm font-medium">
                    Heure actuelle :
                </span>
                <span className="text-indigo-600 font-bold text-lg tabular-nums">
                    {formatTime(time)}
                </span>
            </div>

            {/* Navigation des courses */}
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

            {/* Informations de la course en cours */}
            {eventStatus === "running" && (
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="bg-white rounded-lg p-3">
                        <p className="text-gray-600">Distance</p>
                        <p className="font-semibold">
                            {currentCourse.distance}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                        <p className="text-gray-600">Dossards</p>
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

            {/* Prochain départ */}
            {/* {nextCourse && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-orange-700 font-medium mb-1">
                                ⏰ Prochain départ
                            </p>
                            <p className="font-bold text-gray-900">
                                {nextCourse.categorie} - {nextCourse.annee}
                            </p>
                            <p className="text-sm text-gray-600">
                                {nextCourse.distance}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-orange-600">
                                {nextCourse.depart}
                            </p>
                            <div className="flex items-center gap-2 mt-1 justify-end">
                                <div
                                    className="w-4 h-4 rounded border border-gray-300"
                                    style={{
                                        backgroundColor: getCouleurHex(
                                            nextCourse.couleur
                                        ),
                                    }}
                                ></div>
                                <p className="text-sm text-gray-600">
                                    {nextCourse.couleur}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default RaceNavigation;
