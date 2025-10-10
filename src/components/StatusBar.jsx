function StatusBar() {
    return (
        <div className="mt-2 bg-gray-900/50 backdrop-blur border border-gray-700 rounded-lg p-1.5 flex items-center justify-center gap-2">
            <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <p className="text-gray-300 font-semibold tracking-wide text-xs">
                AFFICHAGE ACTIF - SYNCHRONISÉ
            </p>
        </div>
    );
}

export default StatusBar;
