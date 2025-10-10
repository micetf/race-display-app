import { useState } from "react";

function ImageDisplay({ url }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setLoading(false);
        setError(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <div className="flex items-center justify-center h-full bg-black">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                </div>
            )}

            {error && (
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <p className="text-white text-2xl">
                        Erreur de chargement de l'image
                    </p>
                    <p className="text-gray-400 mt-2">Vérifiez l'URL fournie</p>
                </div>
            )}

            {!error && (
                <img
                    src={url}
                    alt="Affichage"
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`w-full h-full object-contain transition-opacity duration-500 ${
                        loading ? "opacity-0" : "opacity-100"
                    }`}
                />
            )}
        </div>
    );
}

export default ImageDisplay;
