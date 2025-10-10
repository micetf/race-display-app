import { useState, useEffect } from "react";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { useMusicControl } from "../hooks/useMusicControl";
import MusicSelector from "../components/MusicSelector";
import RaceNavigation from "../components/RaceNavigation";
import PodiumForm from "../components/PodiumForm";
import EventStatus from "../components/EventStatus";
import { coursesById, coursesAllIds, getCouleurHex } from "../data/courses";
import { musiquesById } from "../data/musiques";
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
    const [currentMusic, setCurrentMusic] = useState(null);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

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
                setShowAdvancedOptions(false);
                alert("✓ Tous les podiums ont été effacés.");
            }
        } else if (userInput !== null) {
            alert(
                "Action annulée : le texte de confirmation ne correspond pas."
            );
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
                music: currentMusic ? musiquesById[currentMusic] : null,
            },
        });

        // Feedback visuel
        const button = document.activeElement;
        if (button) {
            button.textContent = "✓ Mis à jour !";
            setTimeout(() => {
                button.textContent = "🚀 Mettre à jour l'affichage";
            }, 2000);
        }
    };

    const handleMusicControl = (musicControl) => {
        if (musicControl.action === "play" && musicControl.musicId) {
            setCurrentMusic(musicControl.musicId);
        } else if (musicControl.action === "stop") {
            setCurrentMusic(null);
        }

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
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

                {/* Barre de contrôle des modes */}
                <div className="mb-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                    <div className="flex gap-3 items-center flex-wrap">
                        {/* Modes à gauche */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setDisplayMode("image")}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                    displayMode === "image"
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                }`}
                                title="Afficher une image d'accueil"
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
                                title="Gérer les courses et podiums"
                            >
                                🏁 Courses
                            </button>
                            <button
                                onClick={() => setDisplayMode("music")}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                    displayMode === "music"
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                }`}
                                title="Gérer la musique de fond"
                            >
                                🎵 Musique
                            </button>
                        </div>

                        {/* Séparateur flexible */}
                        <div className="flex-1 min-w-[20px]"></div>

                        {/* Informations à droite */}
                        <div className="flex gap-2 items-center flex-wrap">
                            {/* Indicateur musique en cours avec bouton Stop */}
                            {currentMusic && (
                                <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                                    <span className="text-purple-700 text-sm font-medium flex items-center gap-1.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                        </span>
                                        Musique active
                                    </span>
                                    <button
                                        onClick={handleStopMusic}
                                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors font-medium"
                                        title="Arrêter la musique"
                                    >
                                        ⏸️ Stop
                                    </button>
                                </div>
                            )}

                            {/* Compteur de podiums */}
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
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Afficher une Image
                                </h2>
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
                                    />
                                    <p className="text-sm text-gray-500 mt-2 flex items-start gap-2">
                                        <span>💡</span>
                                        <span>
                                            Utilisez une URL complète
                                            (https://...) ou un chemin local
                                            depuis le dossier public
                                            (/image.jpg)
                                        </span>
                                    </p>
                                </div>
                                <button
                                    onClick={handleDisplayImage}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl hover:scale-[1.02]"
                                >
                                    📺 Afficher l'image
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

                            {/* Note informative */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800 flex items-start gap-2">
                                    <span>💡</span>
                                    <span>
                                        Une fois vos modifications terminées,
                                        cliquez sur le bouton{" "}
                                        <strong>
                                            "🚀 Mettre à jour l'affichage"
                                        </strong>{" "}
                                        en bas de page pour envoyer les données
                                        vers l'écran.
                                    </span>
                                </p>
                            </div>
                        </>
                    )}

                    {/* Mode Musique */}
                    {displayMode === "music" && (
                        <MusicSelector
                            onMusicControl={handleMusicControl}
                            currentMusic={currentMusic}
                        />
                    )}
                </div>

                {/* Footer avec options avancées */}
                <footer className="mt-12 pt-6 border-t border-gray-200">
                    <div className="mb-6">
                        <button
                            onClick={() =>
                                setShowAdvancedOptions(!showAdvancedOptions)
                            }
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
                        >
                            <span>⚙️ Options avancées</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${
                                    showAdvancedOptions ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {showAdvancedOptions && (
                            <div className="mt-4 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6 shadow-md">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xl font-bold">
                                            ⚠️
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-red-900 text-lg mb-1">
                                            Zone de danger
                                        </h3>
                                        <p className="text-sm text-red-700">
                                            Cette action supprimera{" "}
                                            <strong>
                                                TOUS les podiums de TOUTES les
                                                courses
                                            </strong>
                                            . Elle est IRRÉVERSIBLE et ne doit
                                            être utilisée qu'en fin d'événement.
                                        </p>
                                    </div>
                                </div>

                                {savedPodimsCount > 0 ? (
                                    <>
                                        <div className="bg-white border border-red-200 rounded-lg p-3 mb-4">
                                            <p className="text-sm text-gray-700">
                                                <strong>
                                                    Nombre de podiums :
                                                </strong>{" "}
                                                {savedPodimsCount} course(s)
                                                avec des données
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleResetAllPodiums}
                                            className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-bold shadow-md hover:shadow-lg"
                                        >
                                            🗑️ EFFACER TOUS LES PODIUMS
                                        </button>
                                        <p className="text-xs text-red-600 mt-2 text-center">
                                            Vous devrez taper "SUPPRIMER" pour
                                            confirmer
                                        </p>
                                    </>
                                ) : (
                                    <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
                                        <p className="text-sm text-green-700">
                                            ✓ Aucun podium sauvegardé
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Cross Scolaire d'Annonay - 16 Octobre 2025
                    </p>
                    <p className="text-center text-xs text-gray-400 mt-1">
                        Développé avec ❤️ en React + Tailwind CSS + Vite
                    </p>
                </footer>
            </div>

            {/* Bouton sticky en bas (uniquement en mode Course) */}
            {displayMode === "race" && (
                <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pb-4 pt-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <button
                            onClick={handleUpdateRaceDisplay}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-bold text-lg shadow-2xl hover:shadow-[0_20px_25px_-5px_rgba(16,185,129,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <span>🚀</span>
                            <span>Mettre à jour l'affichage</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ControlPage;
