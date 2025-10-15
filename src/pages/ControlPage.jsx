// src/pages/ControlPage.jsx
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { useMusicControl } from "../hooks/useMusicControl";
import { useControlState } from "../hooks/useControlState";

// Composants de contrôle
import ControlHeader from "../components/control/ControlHeader";
import ControlModeSelector from "../components/control/ControlModeSelector";
import ControlActionBar from "../components/control/ControlActionBar";
import ControlStatusIndicators from "../components/control/ControlStatusIndicators";

// Panneaux de modes
import ImageModePanel from "../components/modes/ImageModePanel";
import RaceModePanel from "../components/modes/RaceModePanel";
import PodiumModePanel from "../components/modes/PodiumModePanel";
import MusicModePanel from "../components/modes/MusicModePanel";

function ControlPage() {
    // ========================================
    // HOOKS DE COMMUNICATION
    // ========================================
    const { sendMessage } = useBroadcastChannel("race-display");
    const { sendMusicControl } = useMusicControl();

    // ========================================
    // ÉTAT GLOBAL (via hook personnalisé)
    // ========================================
    const state = useControlState(sendMessage, sendMusicControl);

    // ========================================
    // HANDLER - OUVERTURE AFFICHAGE
    // ========================================
    const handleOpenDisplay = () => {
        const basename = import.meta.env.BASE_URL || "/";
        const displayUrl = `${window.location.origin}${basename}#/display`;
        const displayFeatures = [
            "toolbar=no",
            "location=no",
            "status=no",
            "menubar=no",
            "scrollbars=no",
            "resizable=yes",
            "width=1920",
            "height=1080",
            "left=0",
            "top=0",
        ].join(",");

        window.open(displayUrl, "DisplayWindow", displayFeatures);
    };

    // ========================================
    // RENDU
    // ========================================
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
            <div className="max-w-7xl mx-auto p-6">
                {/* En-tête */}
                <ControlHeader onOpenDisplay={handleOpenDisplay} />

                {/* Barre de contrôle principale */}
                <div className="mb-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center gap-4 flex-wrap">
                        {/* Sélecteur de modes */}
                        <ControlModeSelector
                            currentMode={state.displayMode}
                            onModeChange={state.setDisplayMode}
                        />

                        {/* Barre d'actions */}
                        <div className="flex gap-2 flex-wrap items-center">
                            <ControlActionBar
                                mode={state.displayMode}
                                imageDisplayed={state.imageDisplayed}
                                currentMusic={state.currentMusic}
                                onToggleImage={state.handleToggleImage}
                                onUpdateRace={state.handleUpdateRaceDisplay}
                                onUpdatePodium={state.handleUpdatePodiumDisplay}
                                onResetPodium={state.handleResetPodium}
                                onResetAllPodiums={state.handleResetAllPodiums}
                                onStopMusic={state.handleStopMusic}
                            />

                            {/* Indicateurs de statut */}
                            <ControlStatusIndicators
                                currentMusic={state.currentMusic}
                                savedPodimsCount={state.savedPodimsCount}
                            />
                        </div>
                    </div>
                </div>

                {/* Contenu selon le mode */}
                <div className="space-y-6">
                    {/* Mode Image */}
                    {state.displayMode === "image" && (
                        <ImageModePanel
                            imageUrl={state.imageUrl}
                            imageDisplayed={state.imageDisplayed}
                            onImageUrlChange={state.setImageUrl}
                        />
                    )}

                    {/* Mode Courses */}
                    {state.displayMode === "race" && (
                        <RaceModePanel
                            displayedRaceIndex={state.displayedRaceIndex}
                            coursesData={state.coursesData}
                            currentIndex={state.currentIndex}
                            eventStatus={state.eventStatus}
                            currentCourse={state.currentCourse}
                            nextCourse={state.nextCourse}
                            onCoursesUpdate={state.handleCoursesUpdate}
                            onPrevious={state.handlePrevious}
                            onNext={state.handleNext}
                        />
                    )}

                    {/* Mode Podiums */}
                    {state.displayMode === "podium" && (
                        <PodiumModePanel
                            displayedPodiumIndex={state.displayedPodiumIndex}
                            coursesData={state.coursesData}
                            podiumCourseIndex={state.podiumCourseIndex}
                            podium={state.podium}
                            onPodiumCourseChange={state.setPodiumCourseIndex}
                            onPodiumChange={state.handlePodiumChange}
                            onAddPosition={state.handleAddPosition}
                            onRemovePosition={state.handleRemovePosition}
                        />
                    )}

                    {/* Mode Musique */}
                    {state.displayMode === "music" && (
                        <MusicModePanel
                            currentMusic={state.currentMusic}
                            onMusicControl={state.handleMusicControl}
                        />
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-12 pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">
                        Cross Scolaire d'Annonay - 16 Octobre 2025
                    </p>
                    <p className="text-center text-xs text-gray-400 mt-1">
                        Développé avec ❤️ en React + Tailwind CSS + Vite
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default ControlPage;
