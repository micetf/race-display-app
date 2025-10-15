// src/components/CourseEditor.jsx
import { useState, useEffect } from "react";
import { Clock, Edit2, RotateCcw, Save, X } from "lucide-react";
import { coursesById, coursesAllIds } from "../data/courses";
import {
    loadCourse,
    saveCourse,
    resetCourse,
    isCourseModified,
    countModifiedCourses,
    resetAllCourses,
} from "../utils/courseStorage";

function CourseEditor({ onCoursesUpdate }) {
    const [editMode, setEditMode] = useState(false);
    const [courses, setCourses] = useState({});
    const [modifiedCount, setModifiedCount] = useState(0);
    const [editingCourse, setEditingCourse] = useState(null);

    // Charger les courses au montage
    useEffect(() => {
        loadAllCourses();
        setModifiedCount(countModifiedCourses());
    }, []);

    const loadAllCourses = () => {
        const loadedCourses = {};
        coursesAllIds.forEach((courseId) => {
            loadedCourses[courseId] = loadCourse(
                courseId,
                coursesById[courseId]
            );
        });
        setCourses(loadedCourses);
    };

    const handleEditCourse = (courseId) => {
        setEditingCourse(courseId);
    };

    const handleSaveCourse = (courseId) => {
        const courseData = courses[courseId];
        saveCourse(courseId, courseData);
        setEditingCourse(null);
        setModifiedCount(countModifiedCourses());

        // Notifier le parent des changements
        if (onCoursesUpdate) {
            onCoursesUpdate(courses);
        }
    };

    const handleCancelEdit = (courseId) => {
        // Recharger la course depuis le storage
        setCourses((prev) => ({
            ...prev,
            [courseId]: loadCourse(courseId, coursesById[courseId]),
        }));
        setEditingCourse(null);
    };

    const handleResetCourse = (courseId) => {
        if (
            window.confirm(
                `Réinitialiser la course "${coursesById[courseId].categorie} ${coursesById[courseId].annee}" à ses horaires d'origine ?`
            )
        ) {
            resetCourse(courseId);
            setCourses((prev) => ({
                ...prev,
                [courseId]: coursesById[courseId],
            }));
            setModifiedCount(countModifiedCourses());

            if (onCoursesUpdate) {
                onCoursesUpdate({
                    ...courses,
                    [courseId]: coursesById[courseId],
                });
            }
        }
    };

    const handleResetAllCourses = () => {
        const confirmText = "REINITIALISER";
        const userInput = window.prompt(
            `⚠️ ATTENTION ⚠️\n\nCette action va réinitialiser TOUS les horaires aux valeurs d'origine.\n\nSi vous êtes sûr, tapez exactement : ${confirmText}`
        );

        if (userInput === confirmText) {
            resetAllCourses();
            loadAllCourses();
            setModifiedCount(0);

            if (onCoursesUpdate) {
                const defaultCourses = {};
                coursesAllIds.forEach((id) => {
                    defaultCourses[id] = coursesById[id];
                });
                onCoursesUpdate(defaultCourses);
            }

            alert("✓ Tous les horaires ont été réinitialisés.");
        } else if (userInput !== null) {
            alert(
                "Action annulée : le texte de confirmation ne correspond pas."
            );
        }
    };

    const handleTimeChange = (courseId, newTime) => {
        setCourses((prev) => ({
            ...prev,
            [courseId]: {
                ...prev[courseId],
                depart: newTime,
            },
        }));
    };

    if (!editMode) {
        return (
            <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-600" />
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Gestion des Horaires
                            </h3>
                            <p className="text-sm text-gray-600">
                                Modifiez les horaires de départ des courses
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        <Edit2 className="w-4 h-4" />
                        Modifier les horaires
                    </button>
                </div>

                {modifiedCount > 0 && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        <span>⚠️</span>
                        <span>
                            {modifiedCount} course{modifiedCount > 1 ? "s" : ""}{" "}
                            modifiée{modifiedCount > 1 ? "s" : ""}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="border border-indigo-300 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                        Modification des Horaires
                    </h3>
                </div>
                <div className="flex gap-2">
                    {modifiedCount > 0 && (
                        <button
                            onClick={handleResetAllCourses}
                            className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Tout réinitialiser
                        </button>
                    )}
                    <button
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                        Fermer
                    </button>
                </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
                {coursesAllIds.map((courseId, index) => {
                    const course = courses[courseId];
                    const isEditing = editingCourse === courseId;
                    const isModified = isCourseModified(courseId);

                    return (
                        <div
                            key={courseId}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                                isModified
                                    ? "bg-amber-50 border-amber-300"
                                    : "bg-white border-gray-200"
                            }`}
                        >
                            {/* Numéro de course */}
                            <div className="flex-shrink-0 w-12 text-center">
                                <span className="text-sm font-bold text-gray-600">
                                    #{index + 1}
                                </span>
                            </div>

                            {/* Catégorie */}
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 truncate">
                                    {course.categorie} - {course.annee}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
                                    {course.distance}
                                </p>
                            </div>

                            {/* Horaire */}
                            {isEditing ? (
                                <input
                                    type="time"
                                    value={course.depart}
                                    onChange={(e) =>
                                        handleTimeChange(
                                            courseId,
                                            e.target.value
                                        )
                                    }
                                    className="px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
                                />
                            ) : (
                                <div
                                    className={`px-3 py-2 rounded-lg font-bold text-lg ${
                                        isModified
                                            ? "bg-amber-100 text-amber-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {course.depart}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-1">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleSaveCourse(courseId)
                                            }
                                            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            title="Sauvegarder"
                                        >
                                            <Save className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleCancelEdit(courseId)
                                            }
                                            className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                            title="Annuler"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleEditCourse(courseId)
                                            }
                                            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                            title="Modifier"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        {isModified && (
                                            <button
                                                onClick={() =>
                                                    handleResetCourse(courseId)
                                                }
                                                className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                                title="Réinitialiser"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-600 flex items-start gap-2">
                    <span>💡</span>
                    <span>
                        Les modifications sont sauvegardées automatiquement et
                        persistent après rechargement de la page.
                    </span>
                </p>
                {modifiedCount > 0 && (
                    <p className="text-xs text-amber-700 flex items-start gap-2">
                        <span>⚠️</span>
                        <span>
                            {modifiedCount} course{modifiedCount > 1 ? "s" : ""}{" "}
                            avec horaire{modifiedCount > 1 ? "s" : ""} modifié
                            {modifiedCount > 1 ? "s" : ""}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default CourseEditor;
