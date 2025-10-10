function StatusBar() {
    return (
        <div className="mt-3 bg-gray-900/50 backdrop-blur border-2 border-gray-700 rounded-xl p-2.5 flex items-center justify-center gap-3">
            <div className="relative">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <p className="text-gray-300 font-semibold tracking-wide text-sm">
                AFFICHAGE ACTIF - SYNCHRONISÉ
            </p>
        </div>
    );
}

export default StatusBar;
