import { useState, useEffect } from "react";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import {
    Monitor,
    Image as ImageIcon,
    Trophy,
    ExternalLink,
} from "lucide-react";
import { coursesById, coursesAllIds, getCouleurHex } from "../data/courses";
import {
    loadPodium,
    savePodium,
    getDefaultPodium,
    resetAllPodiums,
    countSavedPodiums,
} from "../utils/podiumStorage";
import RaceNavigation from "../components/RaceNavigation";
import PodiumForm from "../components/PodiumForm";
import EventStatus from "../components/EventStatus";

function ControlPage() {
    const [displayMode, setDisplayMode] = useState("image");
    const [imageUrl, setImageUrl] = useState("/cross-annonay.jpg");
    const [currentIndex, setCurrentIndex] = useState(-1); // -1 = avant le début
    const [podiumCourseIndex, setPodiumCourseIndex] = useState(0);

    // Podium actuel (initialisé depuis le storage)
    const [podium, setPodium] = useState(() => {
        const courseId = coursesAllIds[0];
        return loadPodium(courseId) || getDefaultPodium();
    });

    const { sendMessage } = useBroadcastChannel("race-display");

    // Gérer les différents états de l'événement
    const currentCourse =
        currentIndex >= 0 && currentIndex < coursesAllIds.length
            ? coursesById[coursesAllIds[currentIndex]]
            : null;

    const nextCourse =
        currentIndex >= -1 && currentIndex < coursesAllIds.length - 1
            ? coursesById[coursesAllIds[currentIndex + 1]]
            : null;

    const podiumCourse = coursesById[coursesAllIds[podiumCourseIndex]];

    // Déterminer l'état de l'événement
    const eventStatus =
        currentIndex === -1
            ? "before"
            : currentIndex >= coursesAllIds.length
            ? "after"
            : "running";

    // Charger le podium de la course sélectionnée quand on change de course
    useEffect(() => {
        const courseId = coursesAllIds[podiumCourseIndex];
        const savedPodium = loadPodium(courseId);
        setPodium(savedPodium || getDefaultPodium());
    }, [podiumCourseIndex]);

    // === Handlers d'affichage ===

    const handleDisplayImage = () => {
        if (!imageUrl.trim()) {
            alert("Veuillez entrer une URL d'image");
            return;
        }
        sendMessage({ type: "image", data: { url: imageUrl } });
    };

    const handleDisplayRace = () => {
        const message = {
            type: "race",
            data: {
                currentRace: currentCourse
                    ? {
                          category: currentCourse.categorie,
                          year: currentCourse.annee,
                          distance: currentCourse.distance,
                          color: getCouleurHex(currentCourse.couleur),
                          startTime: currentCourse.depart,
                      }
                    : {
                          category: "-",
                          year: "-",
                          distance: "-",
                          color: "#6b7280",
                          startTime: "-",
                      },
                nextRace: nextCourse
                    ? {
                          category: nextCourse.categorie,
                          year: nextCourse.annee,
                          distance: nextCourse.distance,
                          color: getCouleurHex(nextCourse.couleur),
                          startTime: nextCourse.depart,
                      }
                    : {
                          category: "-",
                          year: "-",
                          distance: "-",
                          color: "#6b7280",
                          startTime: "-",
                      },
                podiumCourse: {
                    category: podiumCourse.categorie,
                    year: podiumCourse.annee,
                    distance: podiumCourse.distance,
                    startTime: podiumCourse.depart,
                },
                podium: podium,
            },
        };
        sendMessage(message);
    };

    // === Handlers de navigation ===

    const handlePreviousCourse = () => {
        if (currentIndex > -1) setCurrentIndex(currentIndex - 1);
    };

    const handleNextCourse = () => {
        if (currentIndex < coursesAllIds.length)
            setCurrentIndex(currentIndex + 1);
    };

    // === Handlers de podium ===

    const handlePodiumChange = (index, field, value) => {
        const newPodium = podium.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setPodium(newPodium);
        savePodium(coursesAllIds[podiumCourseIndex], newPodium);
    };

    const handleAddPodiumPosition = () => {
        const lastPosition = podium[podium.length - 1]?.position || "5";
        const nextPosition = String(parseInt(lastPosition) + 1);
        const newPodium = [
            ...podium,
            { position: nextPosition, name: "", time: "" },
        ];
        setPodium(newPodium);
        savePodium(coursesAllIds[podiumCourseIndex], newPodium);
    };

    const handleRemovePodiumPosition = (index) => {
        if (podium.length > 1) {
            const newPodium = podium.filter((_, i) => i !== index);
            setPodium(newPodium);
            savePodium(coursesAllIds[podiumCourseIndex], newPodium);
        }
    };

    const handleResetPodium = () => {
        if (
            confirm("Voulez-vous vraiment effacer le podium de cette course ?")
        ) {
            const newPodium = getDefaultPodium();
            setPodium(newPodium);
            savePodium(coursesAllIds[podiumCourseIndex], newPodium);
        }
    };

    const handleResetAllPodiums = () => {
        if (
            confirm(
                "⚠️ ATTENTION : Voulez-vous effacer TOUS les podiums de TOUTES les courses ?"
            )
        ) {
            resetAllPodiums();
            setPodium(getDefaultPodium());
            alert("Tous les podiums ont été effacés.");
        }
    };

    const openDisplayWindow = () => {
        window.open("/display", "_blank", "width=1920,height=1080");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto">
                {/* En-tête */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Monitor className="w-8 h-8 text-indigo-600" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Cross Scolaire d'Annonay
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    16 octobre 2025 - Panneau de contrôle
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={openDisplayWindow}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                            Ouvrir l'affichage
                        </button>
                    </div>
                </div>

                {/* Sélecteur de mode */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Mode d'affichage
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setDisplayMode("image")}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                displayMode === "image"
                                    ? "border-indigo-600 bg-indigo-50"
                                    : "border-gray-200 hover:border-indigo-300"
                            }`}
                        >
                            <ImageIcon
                                className={`w-8 h-8 mx-auto mb-2 ${
                                    displayMode === "image"
                                        ? "text-indigo-600"
                                        : "text-gray-400"
                                }`}
                            />
                            <span className="font-medium">Image d'accueil</span>
                        </button>
                        <button
                            onClick={() => setDisplayMode("race")}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                displayMode === "race"
                                    ? "border-indigo-600 bg-indigo-50"
                                    : "border-gray-200 hover:border-indigo-300"
                            }`}
                        >
                            <Trophy
                                className={`w-8 h-8 mx-auto mb-2 ${
                                    displayMode === "race"
                                        ? "text-indigo-600"
                                        : "text-gray-400"
                                }`}
                            />
                            <span className="font-medium">
                                Informations Course
                            </span>
                        </button>
                    </div>
                </div>

                {/* Contenu selon le mode */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {displayMode === "image" ? (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Affichage d'Image
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
                                        placeholder="https://exemple.com/image.jpg"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Image par défaut : Affiche du Cross
                                        Scolaire d'Annonay
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
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Sélection de la Course
                            </h2>

                            <RaceNavigation
                                currentIndex={currentIndex}
                                coursesLength={coursesAllIds.length}
                                currentCourse={currentCourse}
                                nextCourse={nextCourse}
                                eventStatus={eventStatus}
                                onPrevious={handlePreviousCourse}
                                onNext={handleNextCourse}
                            />

                            <PodiumForm
                                podium={podium}
                                podiumCourseIndex={podiumCourseIndex}
                                currentIndex={currentIndex}
                                onPodiumChange={handlePodiumChange}
                                onAddPosition={handleAddPodiumPosition}
                                onRemovePosition={handleRemovePodiumPosition}
                                onPodiumCourseChange={setPodiumCourseIndex}
                                onResetPodium={handleResetPodium}
                            />

                            <EventStatus
                                eventStatus={eventStatus}
                                nextCourse={nextCourse}
                            />

                            <button
                                onClick={handleDisplayRace}
                                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                                Mettre à jour l'affichage
                            </button>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                        💡 Instructions
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>
                            1. Cliquez sur "Ouvrir l'affichage" pour ouvrir le
                            second onglet
                        </li>
                        <li>
                            2. Utilisez F11 dans l'onglet d'affichage pour le
                            plein écran (format 16:9)
                        </li>
                        <li>
                            3. Utilisez les flèches pour naviguer entre les
                            courses
                        </li>
                        <li>
                            4. Sélectionnez la course du podium et remplissez
                            les résultats
                        </li>
                        <li>
                            5. Cliquez sur "Mettre à jour l'affichage" pour
                            synchroniser
                        </li>
                        <li>
                            6. 💾 Les podiums sont sauvegardés automatiquement
                            (même après F5)
                        </li>
                    </ul>
                </div>

                {/* Gestion des données */}
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-red-900 mb-1">
                                ⚙️ Gestion des données
                            </h3>
                            <p className="text-sm text-red-700">
                                {countSavedPodiums()} course(s) avec podium
                                sauvegardé
                            </p>
                        </div>
                        <button
                            onClick={handleResetAllPodiums}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                        >
                            🗑️ Effacer tous les podiums
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlPage;
