import { useState, useEffect } from "react";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import {
    Monitor,
    Image as ImageIcon,
    Trophy,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { coursesById, coursesAllIds, getCouleurHex } from "../data/courses";

// Clé pour le localStorage
const STORAGE_KEY = "cross-annonay-podiums";

// Fonction pour charger les podiums depuis localStorage
const loadPodiumsFromStorage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error("Erreur lors du chargement des podiums:", error);
        return {};
    }
};

// Fonction pour sauvegarder les podiums dans localStorage
const savePodiumsToStorage = (podiums) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(podiums));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des podiums:", error);
    }
};

function ControlPage() {
    const [displayMode, setDisplayMode] = useState("image");
    const [imageUrl, setImageUrl] = useState("/cross-annonay.jpg");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [podiumCourseIndex, setPodiumCourseIndex] = useState(0);

    // Podium actuel (initialisé depuis le storage)
    const [podium, setPodium] = useState(() => {
        const courseId = coursesAllIds[0];
        const allPodiums = loadPodiumsFromStorage();
        return (
            allPodiums[courseId] || [
                { position: "1", name: "", time: "" },
                { position: "2", name: "", time: "" },
                { position: "3", name: "", time: "" },
                { position: "4", name: "", time: "" },
                { position: "5", name: "", time: "" },
            ]
        );
    });

    const { sendMessage } = useBroadcastChannel("race-display");

    const currentCourse = coursesById[coursesAllIds[currentIndex]];
    const nextCourse = coursesById[coursesAllIds[currentIndex + 1]] || null;
    const podiumCourse = coursesById[coursesAllIds[podiumCourseIndex]];

    // Fonction pour sauvegarder le podium actuel
    const savePodium = (newPodium) => {
        const courseId = coursesAllIds[podiumCourseIndex];
        const allPodiums = loadPodiumsFromStorage();
        const updatedPodiums = {
            ...allPodiums,
            [courseId]: newPodium,
        };
        savePodiumsToStorage(updatedPodiums);
    };

    // Charger le podium de la course sélectionnée quand on change de course
    useEffect(() => {
        const courseId = coursesAllIds[podiumCourseIndex];
        const allPodiums = loadPodiumsFromStorage();
        const savedPodium = allPodiums[courseId];

        if (savedPodium) {
            setPodium(savedPodium);
        } else {
            // Podium par défaut si aucune sauvegarde
            setPodium([
                { position: "1", name: "", time: "" },
                { position: "2", name: "", time: "" },
                { position: "3", name: "", time: "" },
                { position: "4", name: "", time: "" },
                { position: "5", name: "", time: "" },
            ]);
        }
    }, [podiumCourseIndex]);

    const handleDisplayImage = () => {
        if (!imageUrl.trim()) {
            alert("Veuillez entrer une URL d'image");
            return;
        }

        const message = {
            type: "image",
            data: { url: imageUrl },
        };
        sendMessage(message);
        console.log("Message envoyé:", message);
    };

    const handleDisplayRace = () => {
        if (!currentCourse) {
            alert("Aucune course sélectionnée");
            return;
        }

        const message = {
            type: "race",
            data: {
                currentRace: {
                    category: currentCourse.categorie,
                    year: currentCourse.annee,
                    distance: currentCourse.distance,
                    color: getCouleurHex(currentCourse.couleur),
                    startTime: currentCourse.depart,
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
        console.log("Message envoyé:", message);
    };

    const handlePreviousCourse = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextCourse = () => {
        if (currentIndex < coursesAllIds.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePodiumChange = (index, field, value) => {
        const newPodium = podium.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setPodium(newPodium);
        savePodium(newPodium);
    };

    const handleAddPodiumPosition = () => {
        const lastPosition = podium[podium.length - 1]?.position || "5";
        const nextPosition = String(parseInt(lastPosition) + 1);
        const newPodium = [
            ...podium,
            { position: nextPosition, name: "", time: "" },
        ];
        setPodium(newPodium);
        savePodium(newPodium);
    };

    const handleRemovePodiumPosition = (index) => {
        if (podium.length > 1) {
            const newPodium = podium.filter((_, i) => i !== index);
            setPodium(newPodium);
            savePodium(newPodium);
        }
    };

    // Réinitialiser le podium de la course actuelle
    const handleResetPodium = () => {
        if (
            confirm("Voulez-vous vraiment effacer le podium de cette course ?")
        ) {
            const newPodium = [
                { position: "1", name: "", time: "" },
                { position: "2", name: "", time: "" },
                { position: "3", name: "", time: "" },
                { position: "4", name: "", time: "" },
                { position: "5", name: "", time: "" },
            ];
            setPodium(newPodium);
            savePodium(newPodium);
        }
    };

    // Réinitialiser TOUS les podiums
    const handleResetAllPodiums = () => {
        if (
            confirm(
                "⚠️ ATTENTION : Voulez-vous effacer TOUS les podiums de TOUTES les courses ?"
            )
        ) {
            localStorage.removeItem(STORAGE_KEY);
            const newPodium = [
                { position: "1", name: "", time: "" },
                { position: "2", name: "", time: "" },
                { position: "3", name: "", time: "" },
                { position: "4", name: "", time: "" },
                { position: "5", name: "", time: "" },
            ];
            setPodium(newPodium);
            alert("Tous les podiums ont été effacés.");
        }
    };

    // Vérifier si le podium actuel a des données
    const hasPodiumData = (courseId) => {
        const allPodiums = loadPodiumsFromStorage();
        const saved = allPodiums[courseId];
        return saved && saved.some((item) => item.name.trim() !== "");
    };

    // Compter le nombre de podiums sauvegardés
    const countSavedPodiums = () => {
        const allPodiums = loadPodiumsFromStorage();
        return Object.keys(allPodiums).filter((id) => {
            const podiumData = allPodiums[id];
            return (
                podiumData && podiumData.some((item) => item.name.trim() !== "")
            );
        }).length;
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

                            {/* Navigation des courses */}
                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={handlePreviousCourse}
                                        disabled={currentIndex === 0}
                                        className="p-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>

                                    <div className="text-center flex-1">
                                        <p className="text-sm text-gray-600 mb-1">
                                            Course {currentIndex + 1} /{" "}
                                            {coursesAllIds.length}
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {currentCourse.categorie} -{" "}
                                            {currentCourse.annee}
                                        </h3>
                                        <p className="text-indigo-600 font-semibold mt-1">
                                            Départ : {currentCourse.depart}
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleNextCourse}
                                        disabled={
                                            currentIndex ===
                                            coursesAllIds.length - 1
                                        }
                                        className="p-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-white rounded-lg p-3">
                                        <p className="text-gray-600">
                                            Distance
                                        </p>
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
                                                    backgroundColor:
                                                        getCouleurHex(
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
                            </div>

                            {/* Podium */}
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        Classement Podium
                                    </h3>
                                </div>

                                {/* Sélecteur de course pour le podium */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Course du podium à afficher
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={podiumCourseIndex}
                                            onChange={(e) =>
                                                setPodiumCourseIndex(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                        >
                                            {coursesAllIds.map(
                                                (courseId, index) => {
                                                    const course =
                                                        coursesById[courseId];
                                                    const hasData =
                                                        hasPodiumData(courseId);
                                                    return (
                                                        <option
                                                            key={courseId}
                                                            value={index}
                                                        >
                                                            {hasData
                                                                ? "✓ "
                                                                : ""}
                                                            Course {index + 1} -{" "}
                                                            {course.categorie}{" "}
                                                            {course.annee} (
                                                            {course.depart})
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                        {podiumCourseIndex !== currentIndex && (
                                            <button
                                                onClick={() =>
                                                    setPodiumCourseIndex(
                                                        currentIndex
                                                    )
                                                }
                                                className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium whitespace-nowrap"
                                                title="Utiliser la course en cours"
                                            >
                                                ↻ Sync
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-xs text-gray-500">
                                            {podiumCourseIndex === currentIndex
                                                ? "✓ Le podium correspond à la course en cours"
                                                : "⚠️ Le podium correspond à une autre course"}
                                        </p>
                                        {hasPodiumData(
                                            coursesAllIds[podiumCourseIndex]
                                        ) && (
                                            <span className="text-xs text-green-600 font-medium">
                                                💾 Sauvegardé
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {podium.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3 items-center"
                                        >
                                            <input
                                                type="text"
                                                value={item.position}
                                                onChange={(e) =>
                                                    handlePodiumChange(
                                                        index,
                                                        "position",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="1"
                                                className="w-16 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center font-bold"
                                                title="Position (ex: 1, 2, 3 ou 3ex pour ex-aequo)"
                                            />
                                            <input
                                                type="text"
                                                value={item.name}
                                                onChange={(e) =>
                                                    handlePodiumChange(
                                                        index,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nom du participant"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            <input
                                                type="text"
                                                value={item.time}
                                                onChange={(e) =>
                                                    handlePodiumChange(
                                                        index,
                                                        "time",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Temps"
                                                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            {podium.length > 1 && (
                                                <button
                                                    onClick={() =>
                                                        handleRemovePodiumPosition(
                                                            index
                                                        )
                                                    }
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Supprimer cette ligne"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        onClick={handleAddPodiumPosition}
                                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors font-medium"
                                    >
                                        + Ajouter une position
                                    </button>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleResetPodium}
                                            className="flex-1 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                                        >
                                            🗑️ Effacer ce podium
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-2">
                                        💡 Pour les ex-aequo, utilisez la même
                                        position (ex: 3, 3, 5...)
                                    </p>
                                    <p className="text-xs text-green-600 mt-1">
                                        💾 Sauvegarde automatique à chaque
                                        modification
                                    </p>
                                </div>
                            </div>

                            {/* Aperçu du prochain départ */}
                            {nextCourse && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <h3 className="font-semibold text-blue-900 mb-2">
                                        📍 Prochain départ
                                    </h3>
                                    <p className="text-blue-800">
                                        <span className="font-semibold">
                                            {nextCourse.categorie}
                                        </span>{" "}
                                        - {nextCourse.annee} à{" "}
                                        <span className="font-semibold">
                                            {nextCourse.depart}
                                        </span>
                                    </p>
                                </div>
                            )}

                            {/* Bouton de soumission */}
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
