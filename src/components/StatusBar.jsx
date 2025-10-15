function StatusBar() {
    return (
        <div
            className="bg-gray-900/50 backdrop-blur border-responsive-thin border-gray-700 rounded-responsive-md flex items-center justify-center gap-responsive-sm"
            style={{ padding: "0.8vh 1vw" }}
        >
            <div className="relative">
                <div
                    className="bg-green-500 rounded-full animate-pulse"
                    style={{ width: "1vmin", height: "1vmin" }}
                ></div>
                <div
                    className="absolute inset-0 bg-green-500 rounded-full animate-ping"
                    style={{ width: "1vmin", height: "1vmin" }}
                ></div>
            </div>
            <p className="text-gray-300 font-semibold tracking-wide text-responsive-xs">
                AFFICHAGE ACTIF - SYNCHRONISÉ
            </p>
        </div>
    );
}

export default StatusBar;
