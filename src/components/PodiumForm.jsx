import { hasPodiumData } from "../utils/podiumStorage";
import { coursesById, coursesAllIds } from "../data/courses";

function PodiumForm({
    podium,
    podiumCourseIndex,
    currentIndex,
    onPodiumChange,
    onAddPosition,
    onRemovePosition,
    onPodiumCourseChange,
    onResetPodium,
}) {
    return (
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
                            onPodiumCourseChange(Number(e.target.value))
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    >
                        {coursesAllIds.map((courseId, index) => {
                            const course = coursesById[courseId];
                            const hasData = hasPodiumData(courseId);
                            return (
                                <option key={courseId} value={index}>
                                    {hasData ? "✓ " : ""}Course {index + 1} -{" "}
                                    {course.categorie} {course.annee} (
                                    {course.depart})
                                </option>
                            );
                        })}
                    </select>
                    {podiumCourseIndex !== currentIndex &&
                        currentIndex >= 0 && (
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
                    <p className="text-xs text-gray-500">
                        {podiumCourseIndex === currentIndex
                            ? "✓ Le podium correspond à la course en cours"
                            : "⚠️ Le podium correspond à une autre course"}
                    </p>
                    {hasPodiumData(coursesAllIds[podiumCourseIndex]) && (
                        <span className="text-xs text-green-600 font-medium">
                            💾 Sauvegardé
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {podium.map((item, index) => (
                    <div key={index} className="flex gap-3 items-center">
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
                                onPodiumChange(index, "name", e.target.value)
                            }
                            placeholder="Nom du participant"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            value={item.time}
                            onChange={(e) =>
                                onPodiumChange(index, "time", e.target.value)
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
                ))}

                <button
                    onClick={onAddPosition}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors font-medium"
                >
                    + Ajouter une position
                </button>

                <div className="flex gap-2">
                    <button
                        onClick={onResetPodium}
                        className="flex-1 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                    >
                        🗑️ Effacer ce podium
                    </button>
                </div>

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
