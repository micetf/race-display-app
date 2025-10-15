// src/utils/courseStorage.js
// Gestion de la persistance des modifications d'horaires

const STORAGE_KEY = "cross-annonay-courses";

/**
 * Charger les courses modifiées depuis localStorage
 * @returns {Object} Objet avec les courses modifiées
 */
export const loadCoursesFromStorage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error("Erreur lors du chargement des courses:", error);
        return {};
    }
};

/**
 * Sauvegarder les courses modifiées dans localStorage
 * @param {Object} courses - Objet contenant les courses modifiées
 */
export const saveCoursesToStorage = (courses) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des courses:", error);
    }
};

/**
 * Sauvegarder une course spécifique
 * @param {string} courseId - ID de la course
 * @param {Object} courseData - Données de la course
 */
export const saveCourse = (courseId, courseData) => {
    const allCourses = loadCoursesFromStorage();
    const updatedCourses = {
        ...allCourses,
        [courseId]: courseData,
    };
    saveCoursesToStorage(updatedCourses);
};

/**
 * Charger une course spécifique
 * @param {string} courseId - ID de la course
 * @param {Object} defaultCourse - Données par défaut de la course
 * @returns {Object} Données de la course (modifiées ou par défaut)
 */
export const loadCourse = (courseId, defaultCourse) => {
    const allCourses = loadCoursesFromStorage();
    return allCourses[courseId] || defaultCourse;
};

/**
 * Vérifier si une course a été modifiée
 * @param {string} courseId - ID de la course
 * @returns {boolean}
 */
export const isCourseModified = (courseId) => {
    const allCourses = loadCoursesFromStorage();
    return courseId in allCourses;
};

/**
 * Compter le nombre de courses modifiées
 * @returns {number}
 */
export const countModifiedCourses = () => {
    const allCourses = loadCoursesFromStorage();
    return Object.keys(allCourses).length;
};

/**
 * Réinitialiser une course à ses valeurs par défaut
 * @param {string} courseId - ID de la course
 */
export const resetCourse = (courseId) => {
    const allCourses = loadCoursesFromStorage();
    delete allCourses[courseId];
    saveCoursesToStorage(allCourses);
};

/**
 * Réinitialiser toutes les courses
 */
export const resetAllCourses = () => {
    localStorage.removeItem(STORAGE_KEY);
};

/**
 * Obtenir toutes les courses avec leurs modifications
 * @param {Object} defaultCoursesById - Objet des courses par défaut
 * @returns {Object} Objet des courses avec modifications appliquées
 */
export const getCoursesWithModifications = (defaultCoursesById) => {
    const modifications = loadCoursesFromStorage();
    const result = {};

    for (const courseId in defaultCoursesById) {
        result[courseId] =
            modifications[courseId] || defaultCoursesById[courseId];
    }

    return result;
};
