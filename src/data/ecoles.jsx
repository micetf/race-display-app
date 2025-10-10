// Liste des établissements scolaires participants
export const ecolesById = {
    perrieres: {
        id: "perrieres",
        nom: "Collège des Perrières",
        type: "collège",
        ville: "Annonay",
    },
    lombardiere: {
        id: "lombardiere",
        nom: "Collège de la Lombardière",
        type: "collège",
        ville: "Annonay",
    },
    notre_dame: {
        id: "notre_dame",
        nom: "Collège Notre Dame",
        type: "collège",
        ville: "Annonay",
    },
    saint_basile: {
        id: "saint_basile",
        nom: "Collège Saint Basile",
        type: "collège",
        ville: "Annonay",
    },
    agrotechno: {
        id: "agrotechno",
        nom: "Lycée Agrotechnologique",
        type: "lycée",
        ville: "Annonay",
    },
    marcSeguin: {
        id: "marcSeguin",
        nom: "Lycée Marc Seguin",
        type: "lycée",
        ville: "Annonay",
    },
    saintDenis: {
        id: "saintDenis",
        nom: "Lycée Sainte-Anne",
        type: "lycée",
        ville: "Annonay",
    },
    boissy: {
        id: "boissy",
        nom: "Lycée Boissy d'Anglas",
        type: "lycée",
        ville: "Annonay",
    },
    fontchevalier: {
        id: "fontchevalier",
        nom: "École de Fontchevalier",
        type: "école primaire",
        ville: "Annonay",
    },
    jeanmoulin: {
        id: "jeanmoulin",
        nom: "École de Jean Moulin",
        type: "école primaire",
        ville: "Annonay",
    },
    cordeliers: {
        id: "cordeliers",
        nom: "École des Cordeliers",
        type: "école primaire",
        ville: "Annonay",
    },
    vangogh: {
        id: "vangogh",
        nom: "École Van Gogh",
        type: "école primaire",
        ville: "Annonay",
    },
    vissenty: {
        id: "vissenty",
        nom: "École Vissenty",
        type: "école primaire",
        ville: "Annonay",
    },
    canceMalleval: {
        id: "canceMalleval",
        nom: "École Cance-Malleval",
        type: "école primaire",
        ville: "Annonay",
    },
};

export const ecolesAllIds = Object.keys(ecolesById);

// Obtenir le nom complet d'une école
export const getEcoleNom = (ecoleId) => {
    return ecolesById[ecoleId]?.nom || "";
};

// Obtenir une école par son ID
export const getEcoleById = (ecoleId) => {
    return ecolesById[ecoleId] || null;
};
