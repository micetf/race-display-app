// Clé pour le localStorage
const STORAGE_KEY = "cross-annonay-podiums";

// Fonction pour charger les podiums depuis localStorage
export const loadPodiumsFromStorage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error("Erreur lors du chargement des podiums:", error);
        return {};
    }
};

// Fonction pour sauvegarder les podiums dans localStorage
export const savePodiumsToStorage = (podiums) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(podiums));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des podiums:", error);
    }
};

// Fonction pour sauvegarder un seul podium
export const savePodium = (courseId, podium) => {
    const allPodiums = loadPodiumsFromStorage();
    const updatedPodiums = {
        ...allPodiums,
        [courseId]: podium,
    };
    savePodiumsToStorage(updatedPodiums);
};

// Fonction pour charger un podium spécifique
export const loadPodium = (courseId) => {
    const allPodiums = loadPodiumsFromStorage();
    return allPodiums[courseId] || null;
};

// Vérifier si un podium a des données
export const hasPodiumData = (courseId) => {
    const allPodiums = loadPodiumsFromStorage();
    const saved = allPodiums[courseId];
    return saved && saved.some((item) => item.name.trim() !== "");
};

// Compter le nombre de podiums sauvegardés
export const countSavedPodiums = () => {
    const allPodiums = loadPodiumsFromStorage();
    return Object.keys(allPodiums).filter((id) => {
        const podiumData = allPodiums[id];
        return podiumData && podiumData.some((item) => item.name.trim() !== "");
    }).length;
};

// Réinitialiser tous les podiums
export const resetAllPodiums = () => {
    localStorage.removeItem(STORAGE_KEY);
};

// Podium par défaut
export const getDefaultPodium = () => [
    { position: "1", name: "", time: "" },
    { position: "2", name: "", time: "" },
    { position: "3", name: "", time: "" },
    { position: "4", name: "", time: "" },
    { position: "5", name: "", time: "" },
];
