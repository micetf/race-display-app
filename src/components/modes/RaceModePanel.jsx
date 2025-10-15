// src/components/modes/RaceModePanel.jsx
import { coursesAllIds } from "../../data/courses";
import CourseEditor from "../CourseEditor";
import EventStatus from "../EventStatus";
import RaceNavigation from "../RaceNavigation";

function RaceModePanel({
    displayedRaceIndex,
    coursesData,
    currentIndex,
    eventStatus,
    currentCourse,
    nextCourse,
    onCoursesUpdate,
    onPrevious,
    onNext,
}) {
    return (
        <>
            {/* Indicateur de ce qui est à l'écran */}
            {displayedRaceIndex !== null && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-blue-900">
                            À l'écran actuellement :
                        </p>
                    </div>
                    <p className="text-blue-700 mt-1 ml-5">
                        {displayedRaceIndex === -1 ? (
                            "Événement non démarré"
                        ) : displayedRaceIndex >= coursesAllIds.length ? (
                            "Événement terminé"
                        ) : (
                            <>
                                Course {displayedRaceIndex + 1} -{" "}
                                {
                                    coursesData[
                                        coursesAllIds[displayedRaceIndex]
                                    ].categorie
                                }{" "}
                                {
                                    coursesData[
                                        coursesAllIds[displayedRaceIndex]
                                    ].annee
                                }
                                {displayedRaceIndex + 1 <
                                    coursesAllIds.length && (
                                    <>
                                        {" "}
                                        • Prochain : Course{" "}
                                        {displayedRaceIndex + 2}
                                    </>
                                )}
                            </>
                        )}
                    </p>
                </div>
            )}

            {/* Éditeur d'horaires */}
            <CourseEditor onCoursesUpdate={onCoursesUpdate} />

            <EventStatus
                eventStatus={eventStatus}
                nextCourse={
                    eventStatus === "before"
                        ? coursesData[coursesAllIds[0]]
                        : nextCourse
                }
            />

            <RaceNavigation
                currentIndex={currentIndex}
                coursesLength={coursesAllIds.length}
                currentCourse={currentCourse}
                nextCourse={nextCourse}
                eventStatus={eventStatus}
                onPrevious={onPrevious}
                onNext={onNext}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                    <span>💡</span>
                    <span>
                        Naviguez librement entre les courses. Cliquez sur{" "}
                        <strong>"🚀 Envoyer sur l'écran"</strong> pour afficher
                        la course sélectionnée.
                    </span>
                </p>
            </div>
        </>
    );
}

export default RaceModePanel;
