// src/components/modes/PodiumModePanel.jsx
import { coursesAllIds } from "../../data/courses";
import PodiumForm from "../PodiumForm";

function PodiumModePanel({
    displayedPodiumIndex,
    coursesData,
    podiumCourseIndex,
    podium,
    onPodiumCourseChange,
    onPodiumChange,
    onAddPosition,
    onRemovePosition,
}) {
    return (
        <>
            {/* Indicateur de ce qui est à l'écran */}
            {displayedPodiumIndex !== null && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-amber-900">
                            À l'écran actuellement :
                        </p>
                    </div>
                    <p className="text-amber-700 mt-1 ml-5">
                        Podium de la Course {displayedPodiumIndex + 1} -{" "}
                        {
                            coursesData[coursesAllIds[displayedPodiumIndex]]
                                .categorie
                        }{" "}
                        {coursesData[coursesAllIds[displayedPodiumIndex]].annee}
                    </p>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Gestion des Podiums
                    </h2>
                </div>

                {/* Sélecteur de course pour le podium */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sélectionner la course
                    </label>
                    <select
                        value={podiumCourseIndex}
                        onChange={(e) =>
                            onPodiumCourseChange(Number(e.target.value))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    >
                        {coursesAllIds.map((courseId, index) => {
                            const course = coursesData[courseId];
                            return (
                                <option key={courseId} value={index}>
                                    Course {index + 1} - {course.categorie}{" "}
                                    {course.annee} ({course.depart})
                                </option>
                            );
                        })}
                    </select>
                </div>

                <PodiumForm
                    podium={podium}
                    podiumCourseIndex={podiumCourseIndex}
                    currentIndex={-1}
                    onPodiumChange={onPodiumChange}
                    onAddPosition={onAddPosition}
                    onRemovePosition={onRemovePosition}
                    onPodiumCourseChange={onPodiumCourseChange}
                    showCourseSelector={false}
                />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 flex items-start gap-2">
                    <span>💡</span>
                    <span>
                        Saisissez le podium librement. Cliquez sur{" "}
                        <strong>"🏆 Envoyer sur l'écran"</strong> pour
                        l'afficher.
                    </span>
                </p>
            </div>
        </>
    );
}

export default PodiumModePanel;
