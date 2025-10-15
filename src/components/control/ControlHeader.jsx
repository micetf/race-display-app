// src/components/control/ControlHeader.jsx

function ControlHeader({ onOpenDisplay }) {
    return (
        <header className="mb-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-[300px]">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🏃 Panneau de Contrôle - Cross Annonay 2025
                    </h1>
                    <p className="text-gray-600">
                        Gérez l'affichage en temps réel des courses et des
                        résultats
                    </p>
                </div>
                <button
                    onClick={onOpenDisplay}
                    className="px-4 py-2.5 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200 font-medium shadow-md hover:shadow-lg whitespace-nowrap"
                    title="Ouvrir l'affichage dans une nouvelle fenêtre (F11 pour plein écran)"
                >
                    🖥️ Ouvrir l'affichage
                </button>
            </div>
        </header>
    );
}

export default ControlHeader;
