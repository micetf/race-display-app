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
    const [imageUrl, setImageUrl] = useState("./cross-annonay.jpg");
    const [imageDisplayed, setImageDisplayed] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [podiumCourseIndex, setPodiumCourseIndex] = useState(0);
    const [podium, setPodium] = useState(getDefaultPodium());
    const [savedPodimsCount, setSavedPodimsCount] = useState(0);
    const [currentMusic, setCurrentMusic] = useState(null);

    // États pour tracker ce qui est affiché à l'écran
    const [displayedRaceIndex, setDisplayedRaceIndex] = useState(null);
    const [displayedPodiumIndex, setDisplayedPodiumIndex] = useState(null);

    // Charger le podium au changement de course (mode podium uniquement)
    useEffect(() => {
        if (
            displayMode === "podium" &&
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
    }, [podiumCourseIndex, displayMode]);

    // Sauvegarder le podium à chaque modification
    useEffect(() => {
        if (
            displayMode === "podium" &&
            podiumCourseIndex >= 0 &&
            podiumCourseIndex < coursesAllIds.length
        ) {
            const courseId = coursesAllIds[podiumCourseIndex];
            savePodium(courseId, podium);
            setSavedPodimsCount(countSavedPodiums());
        }
    }, [podium, podiumCourseIndex, displayMode]);

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
        const confirmText = "SUPPRIMER";
        const userInput = window.prompt(
            `⚠️ ATTENTION DANGER ⚠️\n\nCette action va SUPPRIMER DÉFINITIVEMENT tous les podiums de toutes les courses.\n\nCette action est IRRÉVERSIBLE.\n\nSi vous êtes absolument certain, tapez exactement : ${confirmText}`
        );

        if (userInput === confirmText) {
            if (
                window.confirm(
                    "Dernière confirmation : Êtes-vous sûr de vouloir effacer TOUS les podiums ?"
                )
            ) {
                resetAllPodiums();
                setPodium(getDefaultPodium());
                setSavedPodimsCount(0);
                alert("✓ Tous les podiums ont été effacés.");
            }
        } else if (userInput !== null) {
            alert(
                "Action annulée : le texte de confirmation ne correspond pas."
            );
        }
    };

    const handleOpenDisplay = () => {
        const basename = import.meta.env.BASE_URL || "/";
        const displayUrl = `${window.location.origin}${basename}#/display`;
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

        window.open(displayUrl, "DisplayWindow", displayFeatures);
    };

    const handleToggleImage = () => {
        if (imageDisplayed) {
            // Masquer l'image
            sendMessage({
                type: "update",
                data: {
                    image: null,
                },
            });
            setImageDisplayed(false);
        } else {
            // Afficher l'image
            sendMessage({
                type: "update",
                data: {
                    image: { url: imageUrl },
                },
            });
            setImageDisplayed(true);
        }
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
                : null;

        const nextRaceData = nextCourse
            ? {
                  category: nextCourse.categorie,
                  year: nextCourse.annee,
                  distance: nextCourse.distance,
                  color: getCouleurHex(nextCourse.couleur),
                  colorName: nextCourse.couleur,
                  startTime: nextCourse.depart,
              }
            : null;

        // Mettre à jour uniquement les courses (le podium et l'image persistent)
        sendMessage({
            type: "update",
            data: {
                currentRace: currentRaceData,
                nextRace: nextRaceData,
            },
        });

        // Tracker ce qui est affiché
        setDisplayedRaceIndex(currentIndex);

        // Feedback visuel
        const button = document.getElementById("btn-update-race");
        if (button) {
            const originalText = button.textContent;
            button.textContent = "✓ Envoyé !";
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    };

    const handleUpdatePodiumDisplay = () => {
        const podiumCourse = coursesById[coursesAllIds[podiumCourseIndex]];

        const podiumCourseData = {
            category: podiumCourse.categorie,
            year: podiumCourse.annee,
            distance: podiumCourse.distance,
            color: getCouleurHex(podiumCourse.couleur),
            colorName: podiumCourse.couleur,
            startTime: podiumCourse.depart,
        };

        // Mettre à jour uniquement le podium (les courses et l'image persistent)
        sendMessage({
            type: "update",
            data: {
                podiumCourse: podiumCourseData,
                podium: podium,
            },
        });

        // Tracker ce qui est affiché
        setDisplayedPodiumIndex(podiumCourseIndex);

        // Feedback visuel
        const button = document.getElementById("btn-display-podium");
        if (button) {
            const originalText = button.textContent;
            button.textContent = "✓ Envoyé !";
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    };

    const handleMusicControl = (musicControl) => {
        if (musicControl.action === "play" && musicControl.musicId) {
            setCurrentMusic(musicControl.musicId);
        } else if (musicControl.action === "stop") {
            setCurrentMusic(null);
        }

        // Envoyer la commande de musique séparément
        sendMessage({
            type: "music",
            data: musicControl,
        });
        sendMusicControl(musicControl);
    };

    const handleStopMusic = () => {
        handleMusicControl({ action: "stop" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header avec bouton Ouvrir l'affichage */}
                <header className="mb-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-[300px]">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                🏃 Panneau de Contrôle - Cross Annonay 2025
                            </h1>
                            <p className="text-gray-600">
                                Gérez l'affichage en temps réel des courses et
                                des résultats
                            </p>
                        </div>
                        <button
                            onClick={handleOpenDisplay}
                            className="px-4 py-2.5 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200 font-medium shadow-md hover:shadow-lg whitespace-nowrap"
                            title="Ouvrir l'affichage dans une nouvelle fenêtre (F11 pour plein écran)"
                        >
                            🖥️ Ouvrir l'affichage
                        </button>
                    </div>
                </header>

                {/* Barre de contrôle unifiée : Modes à gauche, Actions à droite */}
                <div className="mb-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center gap-4 flex-wrap">
                        {/* Modes à gauche */}
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setDisplayMode("image")}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                    displayMode === "image"
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                }`}
                            >
                                🖼️ Image
                            </button>
                            <button
                                onClick={() => setDisplayMode("race")}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                    displayMode === "race"
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                }`}
                            >
                                🏁 Courses
                            </button>
                            <button
                                onClick={() => setDisplayMode("podium")}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                    displayMode === "podium"
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                }`}
                            >
                                🏆 Podiums
                            </button>
                            <button
                                onClick={() => setDisplayMode("music")}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                    displayMode === "music"
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                }`}
                            >
                                🎵 Musique
                            </button>
                        </div>

                        {/* Actions à droite */}
                        <div className="flex gap-2 flex-wrap items-center">
                            {/* Actions mode Image */}
                            {displayMode === "image" && (
                                <>
                                    <button
                                        onClick={handleToggleImage}
                                        className={`px-4 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg ${
                                            imageDisplayed
                                                ? "bg-orange-500 text-white hover:bg-orange-600"
                                                : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                                        }`}
                                    >
                                        {imageDisplayed
                                            ? "👁️ Masquer l'image"
                                            : "📺 Afficher l'image"}
                                    </button>
                                    {currentMusic && (
                                        <button
                                            onClick={handleStopMusic}
                                            className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                        >
                                            ⏸️ Stop musique
                                        </button>
                                    )}
                                </>
                            )}

                            {/* Actions mode Courses */}
                            {displayMode === "race" && (
                                <>
                                    <button
                                        id="btn-update-race"
                                        onClick={handleUpdateRaceDisplay}
                                        className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                    >
                                        🚀 Envoyer sur l'écran
                                    </button>
                                    {currentMusic && (
                                        <button
                                            onClick={handleStopMusic}
                                            className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                        >
                                            ⏸️ Stop musique
                                        </button>
                                    )}
                                </>
                            )}

                            {/* Actions mode Podiums */}
                            {displayMode === "podium" && (
                                <>
                                    <button
                                        id="btn-display-podium"
                                        onClick={handleUpdatePodiumDisplay}
                                        className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                    >
                                        🏆 Envoyer sur l'écran
                                    </button>
                                    <button
                                        onClick={handleResetPodium}
                                        className="px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                    >
                                        🗑️ Effacer ce podium
                                    </button>
                                    <button
                                        onClick={handleResetAllPodiums}
                                        className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                    >
                                        🗑️ Tout effacer
                                    </button>
                                    {currentMusic && (
                                        <button
                                            onClick={handleStopMusic}
                                            className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                        >
                                            ⏸️ Stop musique
                                        </button>
                                    )}
                                </>
                            )}

                            {/* Indicateurs (toujours visibles) */}
                            {currentMusic && (
                                <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                                    <span className="text-purple-700 text-sm font-medium flex items-center gap-1.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                        </span>
                                        Musique active
                                    </span>
                                </div>
                            )}

                            {savedPodimsCount > 0 && (
                                <span className="px-3 py-2 bg-green-50 text-green-700 rounded-lg font-medium text-sm whitespace-nowrap border border-green-200">
                                    💾 {savedPodimsCount} podium
                                    {savedPodimsCount > 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contenu selon le mode */}
                <div className="space-y-6">
                    {/* Mode Image */}
                    {displayMode === "image" && (
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Affichage Image
                                    </h2>
                                </div>

                                {/* Indicateur d'état */}
                                <div
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                                        imageDisplayed
                                            ? "bg-green-50 border-green-200"
                                            : "bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    <div
                                        className={`w-2.5 h-2.5 rounded-full ${
                                            imageDisplayed
                                                ? "bg-green-500 animate-pulse"
                                                : "bg-gray-400"
                                        }`}
                                    ></div>
                                    <span
                                        className={`text-sm font-medium ${
                                            imageDisplayed
                                                ? "text-green-700"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {imageDisplayed
                                            ? "Image affichée"
                                            : "Image masquée"}
                                    </span>
                                </div>
                            </div>

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
                                        placeholder="/cross-annonay.jpg ou https://..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        disabled={imageDisplayed}
                                    />
                                    <p className="text-sm text-gray-500 mt-2 flex items-start gap-2">
                                        <span>💡</span>
                                        <span>
                                            {imageDisplayed
                                                ? "Masquez l'image pour modifier l'URL"
                                                : "Utilisez une URL complète (https://...) ou un chemin local depuis le dossier public (/image.jpg)"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mode Courses */}
                    {displayMode === "race" && (
                        <>
                            {/* Indicateur de ce qui est à l'écran */}
                            {displayedRaceIndex !== null && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                                        <p className="text-sm font-medium text-blue-900">
                                            À l'écran actuellement :
                                        </p>
                                    </div>
                                    <p className="text-blue-700 mt-1 ml-5">
                                        {displayedRaceIndex === -1 ? (
                                            "Événement non démarré"
                                        ) : displayedRaceIndex >=
                                          coursesAllIds.length ? (
                                            "Événement terminé"
                                        ) : (
                                            <>
                                                Course {displayedRaceIndex + 1}{" "}
                                                -{" "}
                                                {
                                                    coursesById[
                                                        coursesAllIds[
                                                            displayedRaceIndex
                                                        ]
                                                    ].categorie
                                                }{" "}
                                                {
                                                    coursesById[
                                                        coursesAllIds[
                                                            displayedRaceIndex
                                                        ]
                                                    ].annee
                                                }
                                                {displayedRaceIndex + 1 <
                                                    coursesAllIds.length && (
                                                    <>
                                                        {" "}
                                                        • Prochain : Course{" "}
                                                        {displayedRaceIndex + 2}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </p>
                                </div>
                            )}

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

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800 flex items-start gap-2">
                                    <span>💡</span>
                                    <span>
                                        Naviguez librement entre les courses.
                                        Cliquez sur{" "}
                                        <strong>
                                            "🚀 Envoyer sur l'écran"
                                        </strong>{" "}
                                        pour afficher la course sélectionnée.
                                    </span>
                                </p>
                            </div>
                        </>
                    )}

                    {/* Mode Podiums */}
                    {displayMode === "podium" && (
                        <>
                            {/* Indicateur de ce qui est à l'écran */}
                            {displayedPodiumIndex !== null && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></div>
                                        <p className="text-sm font-medium text-amber-900">
                                            À l'écran actuellement :
                                        </p>
                                    </div>
                                    <p className="text-amber-700 mt-1 ml-5">
                                        Podium de la Course{" "}
                                        {displayedPodiumIndex + 1} -{" "}
                                        {
                                            coursesById[
                                                coursesAllIds[
                                                    displayedPodiumIndex
                                                ]
                                            ].categorie
                                        }{" "}
                                        {
                                            coursesById[
                                                coursesAllIds[
                                                    displayedPodiumIndex
                                                ]
                                            ].annee
                                        }
                                    </p>
                                </div>
                            )}

                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Gestion des Podiums
                                    </h2>
                                </div>

                                {/* Sélecteur de course pour le podium */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sélectionner la course
                                    </label>
                                    <select
                                        value={podiumCourseIndex}
                                        onChange={(e) =>
                                            setPodiumCourseIndex(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                    >
                                        {coursesAllIds.map(
                                            (courseId, index) => {
                                                const course =
                                                    coursesById[courseId];
                                                return (
                                                    <option
                                                        key={courseId}
                                                        value={index}
                                                    >
                                                        Course {index + 1} -{" "}
                                                        {course.categorie}{" "}
                                                        {course.annee} (
                                                        {course.depart})
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>

                                <PodiumForm
                                    podium={podium}
                                    podiumCourseIndex={podiumCourseIndex}
                                    currentIndex={-1}
                                    onPodiumChange={handlePodiumChange}
                                    onAddPosition={handleAddPosition}
                                    onRemovePosition={handleRemovePosition}
                                    onPodiumCourseChange={setPodiumCourseIndex}
                                    showCourseSelector={false}
                                />
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <p className="text-sm text-amber-800 flex items-start gap-2">
                                    <span>💡</span>
                                    <span>
                                        Saisissez le podium librement. Cliquez
                                        sur{" "}
                                        <strong>
                                            "🏆 Envoyer sur l'écran"
                                        </strong>{" "}
                                        pour l'afficher.
                                    </span>
                                </p>
                            </div>
                        </>
                    )}

                    {/* Mode Musique */}
                    {displayMode === "music" && (
                        <>
                            <MusicSelector
                                onMusicControl={handleMusicControl}
                                currentMusic={currentMusic}
                            />
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <p className="text-sm text-purple-800 flex items-start gap-2">
                                    <span>💡</span>
                                    <span>
                                        Sélectionnez une musique pour la
                                        démarrer. Pour l'arrêter, utilisez le
                                        bouton{" "}
                                        <strong>"⏸️ Stop musique"</strong> en
                                        haut à droite.
                                    </span>
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-12 pt-6 border-t border-gray-200">
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
