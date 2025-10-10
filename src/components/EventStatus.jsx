function EventStatus({ eventStatus, nextCourse }) {
    if (eventStatus === "before" && nextCourse) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-900 mb-2">
                    🚀 Première course
                </h3>
                <p className="text-green-800">
                    <span className="font-semibold">
                        {nextCourse.categorie}
                    </span>{" "}
                    - {nextCourse.annee} à{" "}
                    <span className="font-semibold">{nextCourse.depart}</span>
                </p>
            </div>
        );
    }

    if (eventStatus === "running" && nextCourse) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                    📍 Prochain départ
                </h3>
                <p className="text-blue-800">
                    <span className="font-semibold">
                        {nextCourse.categorie}
                    </span>{" "}
                    - {nextCourse.annee} à{" "}
                    <span className="font-semibold">{nextCourse.depart}</span>
                </p>
            </div>
        );
    }

    if (eventStatus === "after") {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-900 mb-2">
                    ✅ Événement terminé
                </h3>
                <p className="text-green-800">
                    Toutes les courses ont été complétées
                </p>
            </div>
        );
    }

    return null;
}

export default EventStatus;
