import { useState } from "react";

function RaceForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        currentRace: {
            category: "",
            year: "",
            distance: "",
            color: "#3b82f6",
            startTime: "",
        },
        nextRace: {
            category: "",
            year: "",
            distance: "",
            color: "#10b981",
            startTime: "",
        },
        podium: [
            { position: 1, name: "", time: "" },
            { position: 2, name: "", time: "" },
            { position: 3, name: "", time: "" },
        ],
    });

    const handleCurrentRaceChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            currentRace: { ...prev.currentRace, [field]: value },
        }));
    };

    const handleNextRaceChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            nextRace: { ...prev.nextRace, [field]: value },
        }));
    };

    const handlePodiumChange = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            podium: prev.podium.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course en cours */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                    Course en cours
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Catégorie
                        </label>
                        <input
                            type="text"
                            value={formData.currentRace.category}
                            onChange={(e) =>
                                handleCurrentRaceChange(
                                    "category",
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Senior Homme"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Année
                        </label>
                        <input
                            type="text"
                            value={formData.currentRace.year}
                            onChange={(e) =>
                                handleCurrentRaceChange("year", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="2024"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Distance
                        </label>
                        <input
                            type="text"
                            value={formData.currentRace.distance}
                            onChange={(e) =>
                                handleCurrentRaceChange(
                                    "distance",
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="10 km"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Heure de départ
                        </label>
                        <input
                            type="time"
                            value={formData.currentRace.startTime}
                            onChange={(e) =>
                                handleCurrentRaceChange(
                                    "startTime",
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Couleur
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={formData.currentRace.color}
                                onChange={(e) =>
                                    handleCurrentRaceChange(
                                        "color",
                                        e.target.value
                                    )
                                }
                                className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={formData.currentRace.color}
                                onChange={(e) =>
                                    handleCurrentRaceChange(
                                        "color",
                                        e.target.value
                                    )
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Prochain départ */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                    Prochain départ
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Catégorie
                        </label>
                        <input
                            type="text"
                            value={formData.nextRace.category}
                            onChange={(e) =>
                                handleNextRaceChange("category", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Junior Femme"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Année
                        </label>
                        <input
                            type="text"
                            value={formData.nextRace.year}
                            onChange={(e) =>
                                handleNextRaceChange("year", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="2024"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Distance
                        </label>
                        <input
                            type="text"
                            value={formData.nextRace.distance}
                            onChange={(e) =>
                                handleNextRaceChange("distance", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="5 km"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Heure de départ
                        </label>
                        <input
                            type="time"
                            value={formData.nextRace.startTime}
                            onChange={(e) =>
                                handleNextRaceChange(
                                    "startTime",
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Couleur
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={formData.nextRace.color}
                                onChange={(e) =>
                                    handleNextRaceChange(
                                        "color",
                                        e.target.value
                                    )
                                }
                                className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={formData.nextRace.color}
                                onChange={(e) =>
                                    handleNextRaceChange(
                                        "color",
                                        e.target.value
                                    )
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Podium */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                    Classement Podium
                </h3>
                <div className="space-y-3">
                    {formData.podium.map((item, index) => (
                        <div key={index} className="flex gap-3 items-center">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold">
                                {item.position}
                            </div>
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Bouton de soumission */}
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
                Mettre à jour l'affichage
            </button>
        </form>
    );
}

export default RaceForm;
