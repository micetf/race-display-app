// Données des courses du Cross Scolaire d'Annonay
export const coursesById = {
    course1: {
        id: "course1",
        depart: "13:10",
        categorie: "BG",
        annee: "2013",
        distance: "2500m P3",
        couleur: "Blanc",
    },
    course2: {
        id: "course2",
        depart: "13:20",
        categorie: "BF",
        annee: "2013",
        distance: "2000m P2",
        couleur: "Blanc",
    },
    course3: {
        id: "course3",
        depart: "13:30",
        categorie: "BG",
        annee: "2013-2014",
        distance: "2500m P3",
        couleur: "Couleur",
    },
    course4: {
        id: "course4",
        depart: "13:40",
        categorie: "BF",
        annee: "2013-2014",
        distance: "2000m P2",
        couleur: "Couleur",
    },
    course5: {
        id: "course5",
        depart: "13:50",
        categorie: "CM2 G",
        annee: "2015",
        distance: "1200m P1",
        couleur: "Blanc",
    },
    course6: {
        id: "course6",
        depart: "14:05",
        categorie: "CM2 F",
        annee: "2013",
        distance: "1200m P1",
        couleur: "Blanc",
    },
    course7: {
        id: "course7",
        depart: "14:20",
        categorie: "MG",
        annee: "2012",
        distance: "3000m P4",
        couleur: "Blanc",
    },
    course8: {
        id: "course8",
        depart: "14:35",
        categorie: "MF",
        annee: "2012",
        distance: "2500m P3",
        couleur: "Blanc",
    },
    course9: {
        id: "course9",
        depart: "14:45",
        categorie: "MG",
        annee: "2011",
        distance: "3000m P4",
        couleur: "Couleur",
    },
    course10: {
        id: "course10",
        depart: "15:05",
        categorie: "MF",
        annee: "2011",
        distance: "2500m P3",
        couleur: "Couleur",
    },
    course11: {
        id: "course11",
        depart: "15:20",
        categorie: "CF 2 + JF",
        annee: "2009 et avant",
        distance: "3000m P4",
        couleur: "Blanc",
    },
    course12: {
        id: "course12",
        depart: "15:35",
        categorie: "CG",
        annee: "2010",
        distance: "3000 P4",
        couleur: "Blanc",
    },
    course13: {
        id: "course13",
        depart: "15:50",
        categorie: "CF",
        annee: "2010",
        distance: "3000m P4",
        couleur: "Couleur",
    },
    course14: {
        id: "course14",
        depart: "16:05",
        categorie: "CG 2 + JG",
        annee: "2009 et avant",
        distance: "3000 P4",
        couleur: "Blanc",
    },
};

export const coursesAllIds = Object.keys(coursesById);

// Fonction pour obtenir la couleur hex depuis le nom
export const getCouleurHex = (couleurNom) => {
    const couleursMap = {
        Blanc: "#ffffff",
        Couleur: "#3b82f6", // Bleu par défaut pour "Couleur"
    };
    return couleursMap[couleurNom] || "#3b82f6";
};
