import { useState, useEffect } from "react";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { useMusicControl } from "../hooks/useMusicControl";
import MusicSelector from "../components/MusicSelector";
import RaceNavigation from "../components/RaceNavigation";
import PodiumForm from "../components/PodiumForm";
import EventStatus from "../components/EventStatus";
import { coursesById, coursesAllIds, getCouleurHex } from "../data/courses";
import {
    loadPodium,
    savePodium,
    resetAllPodiums,
    countSavedPodiums,
    getDefaultPodium,
} from "../utils/podiumStorage";

function ControlPage() {
    const { sendMessage } = useBroadcastChannel("race-display");
    const { sendMusicControl } = useMusicControl();

    // État du mode d'affichage
    const [displayMode, setDisplayMode] = useState("image");
    const [imageUrl, setImageUrl] = useState("/cross-annonay.jpg");
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [podiumCourseIndex, setPodiumCourseIndex] = useState(-1);
    const [podium, setPodium] = useState(getDefaultPodium());
    const [savedPodimsCount, setSavedPodimsCount] = useState(0);

    // Charger le podium au changement de course
    useEffect(() => {
        if (
            podiumCourseIndex >= 0 &&
            podiumCourseIndex < coursesAllIds.length
        ) {
            const courseId = coursesAllIds[podiumCourseIndex];
            const savedPodium = loadPodium(courseId);
            if (savedPodium) {
                setPodium(savedPodium);
            } else {
                setPodium(getDefaultPodium());
            }
        }
        setSavedPodimsCount(countSavedPodiums());
    }, [podiumCourseIndex]);

    // Sauvegarder le podium à chaque modification
    useEffect(() => {
        if (
            podiumCourseIndex >= 0 &&
            podiumCourseIndex < coursesAllIds.length
        ) {
            const courseId = coursesAllIds[podiumCourseIndex];
            savePodium(courseId, podium);
            setSavedPodimsCount(countSavedPodiums());
        }
    }, [podium, podiumCourseIndex]);

    // Synchroniser podiumCourseIndex avec currentIndex
    useEffect(() => {
        if (podiumCourseIndex === -1 && currentIndex >= 0) {
            setPodiumCourseIndex(currentIndex);
        }
    }, [currentIndex, podiumCourseIndex]);

    const getEventStatus = () => {
        if (currentIndex === -1) return "before";
        if (currentIndex >= coursesAllIds.length) return "after";
        return "running";
    };

    const eventStatus = getEventStatus();

    const getCurrentCourse = () => {
        if (currentIndex < 0 || currentIndex >= coursesAllIds.length)
            return null;
        return coursesById[coursesAllIds[currentIndex]];
    };

    const getNextCourse = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < 0 || nextIndex >= coursesAllIds.length) return null;
        return coursesById[coursesAllIds[nextIndex]];
    };

    const currentCourse = getCurrentCourse();
    const nextCourse = getNextCourse();

    const handlePrevious = () => {
        setCurrentIndex((prev) => Math.max(-1, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(coursesAllIds.length, prev + 1));
    };

    const handlePodiumChange = (index, field, value) => {
        setPodium((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const handleAddPosition = () => {
        setPodium((prev) => [
            ...prev,
            {
                position: String(prev.length + 1),
                name: "",
                time: "",
                school: "",
            },
        ]);
    };

    const handleRemovePosition = (index) => {
        if (podium.length > 1) {
            setPodium((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const handleResetPodium = () => {
        if (window.confirm("Voulez-vous vraiment effacer ce podium ?")) {
            setPodium(getDefaultPodium());
        }
    };

    const handleResetAllPodiums = () => {
        if (
            window.confirm(
                "⚠️ ATTENTION : Voulez-vous vraiment effacer TOUS les podiums de TOUTES les courses ?\n\nCette action est irréversible !"
            )
        ) {
            if (
                window.confirm(
                    "Êtes-vous absolument certain ? Cette action supprimera toutes les données de podiums."
                )
            ) {
                resetAllPodiums();
                setPodium(getDefaultPodium());
                setSavedPodimsCount(0);
            }
        }
    };

    const handleOpenDisplay = () => {
        const displayFeatures = [
            "toolbar=no",
            "location=no",
            "status=no",
            "menubar=no",
            "scrollbars=no",
            "resizable=yes",
            "width=1920",
            "height=1080",
            "left=0",
            "top=0",
        ].join(",");

        window.open("/display", "DisplayWindow", displayFeatures);
    };

    const handleDisplayImage = () => {
        sendMessage({
            type: "image",
            data: { url: imageUrl },
        });
    };

    const handleUpdateRaceDisplay = () => {
        const currentRaceData =
            eventStatus === "running" && currentCourse
                ? {
                      category: currentCourse.categorie,
                      year: currentCourse.annee,
                      distance: currentCourse.distance,
                      color: getCouleurHex(currentCourse.couleur),
                      colorName: currentCourse.couleur,
                      startTime: currentCourse.depart,
                  }
                : {
                      category: "-",
                      year: "-",
                      distance: "-",
                      color: "#3b82f6",
                      colorName: "Couleur",
                      startTime: "-",
                  };

        const nextRaceData = nextCourse
            ? {
                  category: nextCourse.categorie,
                  year: nextCourse.annee,
                  distance: nextCourse.distance,
                  color: getCouleurHex(nextCourse.couleur),
                  colorName: nextCourse.couleur,
                  startTime: nextCourse.depart,
              }
            : {
                  category: "-",
                  year: "-",
                  distance: "-",
                  color: "#10b981",
                  colorName: "Couleur",
                  startTime: "-",
              };

        const podiumCourse =
            podiumCourseIndex >= 0 && podiumCourseIndex < coursesAllIds.length
                ? coursesById[coursesAllIds[podiumCourseIndex]]
                : currentCourse || coursesById[coursesAllIds[0]];

        const podiumCourseData = {
            category: podiumCourse.categorie,
            year: podiumCourse.annee,
            distance: podiumCourse.distance,
            color: getCouleurHex(podiumCourse.couleur),
            colorName: podiumCourse.couleur,
            startTime: podiumCourse.depart,
        };

        sendMessage({
            type: "race",
            data: {
                currentRace: currentRaceData,
                nextRace: nextRaceData,
                podiumCourse: podiumCourseData,
                podium: podium,
            },
        });
    };

    const handleMusicControl = (musicControl) => {
        sendMessage({
            type: "music",
            data: musicControl,
        });
        sendMusicControl(musicControl);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🏃 Panneau de Contrôle - Cross Annonay 2025
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Gérez l'affichage en temps réel des courses et des
                        résultats
                    </p>
                    <div className="flex gap-2 flex-wrap items-center">
                        <button
                            onClick={handleOpenDisplay}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                        >
                            🖥️ Ouvrir l'affichage
                        </button>
                        <div className="flex-1"></div>
                        {savedPodimsCount > 0 && (
                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                                💾 {savedPodimsCount} course(s) avec podium
                                sauvegardé
                            </span>
                        )}
                    </div>
                </header>

                {/* Mode Selector */}
                <div className="mb-6 flex gap-2 flex-wrap">
                    <button
                        onClick={() => setDisplayMode("image")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            displayMode === "image"
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-300"
                        }`}
                    >
                        🖼️ Image d'accueil
                    </button>
                    <button
                        onClick={() => setDisplayMode("race")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            displayMode === "race"
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-300"
                        }`}
                    >
                        🏁 Informations Course
                    </button>
                    <button
                        onClick={() => setDisplayMode("music")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            displayMode === "music"
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-300"
                        }`}
                    >
                        🎵 Musique de Fond
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {/* Mode Image */}
                    {displayMode === "image" && (
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Afficher une Image
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL de l'image
                                    </label>
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) =>
                                            setImageUrl(e.target.value)
                                        }
                                        placeholder="/cross-annonay.jpg"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        💡 Utilisez une URL complète
                                        (https://...) ou un chemin local
                                        (/image.jpg)
                                    </p>
                                </div>
                                <button
                                    onClick={handleDisplayImage}
                                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                >
                                    Afficher l'image
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Mode Course */}
                    {displayMode === "race" && (
                        <>
                            <EventStatus
                                eventStatus={eventStatus}
                                nextCourse={
                                    eventStatus === "before"
                                        ? coursesById[coursesAllIds[0]]
                                        : nextCourse
                                }
                            />

                            <RaceNavigation
                                currentIndex={currentIndex}
                                coursesLength={coursesAllIds.length}
                                currentCourse={currentCourse}
                                nextCourse={nextCourse}
                                eventStatus={eventStatus}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                            />

                            <PodiumForm
                                podium={podium}
                                podiumCourseIndex={podiumCourseIndex}
                                currentIndex={currentIndex}
                                onPodiumChange={handlePodiumChange}
                                onAddPosition={handleAddPosition}
                                onRemovePosition={handleRemovePosition}
                                onPodiumCourseChange={setPodiumCourseIndex}
                                onResetPodium={handleResetPodium}
                            />

                            <button
                                onClick={handleUpdateRaceDisplay}
                                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg shadow-lg"
                            >
                                🚀 Mettre à jour l'affichage
                            </button>

                            {savedPodimsCount > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-red-900 mb-2">
                                        ⚠️ Zone de danger
                                    </h3>
                                    <p className="text-sm text-red-700 mb-3">
                                        Cette action supprimera TOUS les podiums
                                        de TOUTES les courses. À utiliser
                                        uniquement en fin d'événement.
                                    </p>
                                    <button
                                        onClick={handleResetAllPodiums}
                                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                    >
                                        🗑️ Effacer tous les podiums
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* Mode Musique */}
                    {displayMode === "music" && (
                        <MusicSelector onMusicControl={handleMusicControl} />
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">
                        Cross Scolaire d'Annonay - 16 Octobre 2025
                    </p>
                    <p className="text-center text-xs text-gray-400 mt-1">
                        Développé avec ❤️ en React + Tailwind CSS + Vite
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default ControlPage;
