import { hasPodiumData } from "../utils/podiumStorage";
import { coursesById, coursesAllIds } from "../data/courses";
import { ecolesById, ecolesAllIds } from "../data/ecoles";

function PodiumForm({
    podium,
    podiumCourseIndex,
    currentIndex = -1,
    onPodiumChange,
    onAddPosition,
    onRemovePosition,
    onPodiumCourseChange = null,
    showCourseSelector = true,
}) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg text-gray-900">
                    Classement Podium
                </h3>
            </div>

            {/* Sélecteur de course pour le podium - Uniquement si showCourseSelector est true */}
            {showCourseSelector && onPodiumCourseChange && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course du podium à afficher
                    </label>
                    <div className="flex gap-2">
                        <select
                            value={podiumCourseIndex}
                            onChange={(e) =>
                                onPodiumCourseChange(Number(e.target.value))
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        >
                            {coursesAllIds.map((courseId, index) => {
                                const course = coursesById[courseId];
                                const hasData = hasPodiumData(courseId);
                                return (
                                    <option key={courseId} value={index}>
                                        {hasData ? "✓ " : ""}Course {index + 1}{" "}
                                        - {course.categorie} {course.annee} (
                                        {course.depart})
                                    </option>
                                );
                            })}
                        </select>
                        {currentIndex >= 0 &&
                            podiumCourseIndex !== currentIndex && (
                                <button
                                    onClick={() =>
                                        onPodiumCourseChange(currentIndex)
                                    }
                                    className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium whitespace-nowrap"
                                    title="Utiliser la course en cours"
                                >
                                    ↻ Sync
                                </button>
                            )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                        {currentIndex >= 0 && (
                            <p className="text-xs text-gray-500">
                                {podiumCourseIndex === currentIndex
                                    ? "✓ Le podium correspond à la course en cours"
                                    : "⚠️ Le podium correspond à une autre course"}
                            </p>
                        )}
                        {hasPodiumData(coursesAllIds[podiumCourseIndex]) && (
                            <span className="text-xs text-green-600 font-medium ml-auto">
                                💾 Sauvegardé
                            </span>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {podium.map((item, index) => (
                    <div
                        key={index}
                        className="space-y-2 p-3 bg-white rounded-lg border border-gray-200"
                    >
                        {/* Ligne 1 : Position, Nom, Temps */}
                        <div className="flex gap-3 items-center">
                            <input
                                type="text"
                                value={item.position}
                                onChange={(e) =>
                                    onPodiumChange(
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
                                    onPodiumChange(
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
                                    onPodiumChange(
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
                                    onClick={() => onRemovePosition(index)}
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

                        {/* Ligne 2 : École */}
                        <div className="flex items-center gap-2 pl-[4.5rem]">
                            <svg
                                className="w-4 h-4 text-gray-400 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                />
                            </svg>
                            <select
                                value={item.school || ""}
                                onChange={(e) =>
                                    onPodiumChange(
                                        index,
                                        "school",
                                        e.target.value
                                    )
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"
                            >
                                <option value="">
                                    -- Sélectionner une école --
                                </option>
                                {ecolesAllIds.map((ecoleId) => {
                                    const ecole = ecolesById[ecoleId];
                                    return (
                                        <option key={ecoleId} value={ecoleId}>
                                            {ecole.nom}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                ))}

                <button
                    onClick={onAddPosition}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors font-medium"
                >
                    + Ajouter une position
                </button>

                <p className="text-xs text-gray-500 mt-2">
                    💡 Pour les ex-aequo, utilisez la même position (ex: 3, 3,
                    5...)
                </p>
                <p className="text-xs text-green-600 mt-1">
                    💾 Sauvegarde automatique à chaque modification
                </p>
            </div>
        </div>
    );
}

export default PodiumForm;
