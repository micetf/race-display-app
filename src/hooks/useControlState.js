// src/hooks/useControlState.js
import { useState, useEffect } from "react";
import { coursesById, coursesAllIds, getCouleurHex } from "../data/courses";
import { getCoursesWithModifications } from "../utils/courseStorage";
import {
    loadPodium,
    savePodium,
    resetAllPodiums,
    countSavedPodiums,
    getDefaultPodium,
} from "../utils/podiumStorage";

/**
 * Hook personnalisé pour gérer l'état complet du panneau de contrôle
 * Centralise toute la logique d'état et les handlers
 */
export const useControlState = (sendMessage, sendMusicControl) => {
    // ========================================
    // ÉTATS
    // ========================================

    // Mode d'affichage
    const [displayMode, setDisplayMode] = useState("image");

    // Image
    const [imageUrl, setImageUrl] = useState("./cross-annonay.jpg");
    const [imageDisplayed, setImageDisplayed] = useState(false);

    // Courses
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [coursesData, setCoursesData] = useState(
        getCoursesWithModifications(coursesById)
    );

    // Podiums
    const [podiumCourseIndex, setPodiumCourseIndex] = useState(0);
    const [podium, setPodium] = useState(getDefaultPodium());
    const [savedPodimsCount, setSavedPodimsCount] = useState(0);

    // Musique
    const [currentMusic, setCurrentMusic] = useState(null);

    // Tracking de ce qui est affiché
    const [displayedRaceIndex, setDisplayedRaceIndex] = useState(null);
    const [displayedPodiumIndex, setDisplayedPodiumIndex] = useState(null);

    // ========================================
    // EFFETS
    // ========================================

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

    // ========================================
    // GETTERS
    // ========================================

    const getEventStatus = () => {
        if (currentIndex === -1) return "before";
        if (currentIndex >= coursesAllIds.length) return "after";
        return "running";
    };

    const getCurrentCourse = () => {
        if (currentIndex < 0 || currentIndex >= coursesAllIds.length)
            return null;
        return coursesData[coursesAllIds[currentIndex]];
    };

    const getNextCourse = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < 0 || nextIndex >= coursesAllIds.length) return null;
        return coursesData[coursesAllIds[nextIndex]];
    };

    // ========================================
    // HANDLERS - NAVIGATION
    // ========================================

    const handlePrevious = () => {
        setCurrentIndex((prev) => Math.max(-1, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(coursesAllIds.length, prev + 1));
    };

    // ========================================
    // HANDLERS - IMAGE
    // ========================================

    const handleToggleImage = () => {
        if (imageDisplayed) {
            sendMessage({
                type: "update",
                data: { image: null },
            });
            setImageDisplayed(false);
        } else {
            sendMessage({
                type: "update",
                data: { image: { url: imageUrl } },
            });
            setImageDisplayed(true);
        }
    };

    // ========================================
    // HANDLERS - COURSES
    // ========================================

    const handleCoursesUpdate = (updatedCourses) => {
        setCoursesData(updatedCourses);
    };

    const handleUpdateRaceDisplay = () => {
        const eventStatus = getEventStatus();
        const currentCourse = getCurrentCourse();
        const nextCourse = getNextCourse();

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

        sendMessage({
            type: "update",
            data: {
                currentRace: currentRaceData,
                nextRace: nextRaceData,
            },
        });

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

    // ========================================
    // HANDLERS - PODIUM
    // ========================================

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

    const handleUpdatePodiumDisplay = () => {
        const podiumCourse = coursesData[coursesAllIds[podiumCourseIndex]];

        const podiumCourseData = {
            category: podiumCourse.categorie,
            year: podiumCourse.annee,
            distance: podiumCourse.distance,
            color: getCouleurHex(podiumCourse.couleur),
            colorName: podiumCourse.couleur,
            startTime: podiumCourse.depart,
        };

        sendMessage({
            type: "update",
            data: {
                podiumCourse: podiumCourseData,
                podium: podium,
            },
        });

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

    // ========================================
    // HANDLERS - MUSIQUE
    // ========================================

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

    // ========================================
    // RETOUR
    // ========================================

    return {
        // États
        displayMode,
        setDisplayMode,
        imageUrl,
        setImageUrl,
        imageDisplayed,
        currentIndex,
        coursesData,
        podiumCourseIndex,
        setPodiumCourseIndex,
        podium,
        savedPodimsCount,
        currentMusic,
        displayedRaceIndex,
        displayedPodiumIndex,

        // Getters
        eventStatus: getEventStatus(),
        currentCourse: getCurrentCourse(),
        nextCourse: getNextCourse(),

        // Handlers - Navigation
        handlePrevious,
        handleNext,

        // Handlers - Image
        handleToggleImage,

        // Handlers - Courses
        handleCoursesUpdate,
        handleUpdateRaceDisplay,

        // Handlers - Podium
        handlePodiumChange,
        handleAddPosition,
        handleRemovePosition,
        handleResetPodium,
        handleResetAllPodiums,
        handleUpdatePodiumDisplay,

        // Handlers - Musique
        handleMusicControl,
        handleStopMusic,
    };
};
