// src/components/modes/ImageModePanel.jsx

function ImageModePanel({ imageUrl, imageDisplayed, onImageUrlChange }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Affichage Image
                    </h2>
                </div>

                {/* Indicateur d'état */}
                <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                        imageDisplayed
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                    }`}
                >
                    <div
                        className={`w-2.5 h-2.5 rounded-full ${
                            imageDisplayed
                                ? "bg-green-500 animate-pulse"
                                : "bg-gray-400"
                        }`}
                    ></div>
                    <span
                        className={`text-sm font-medium ${
                            imageDisplayed ? "text-green-700" : "text-gray-500"
                        }`}
                    >
                        {imageDisplayed ? "Image affichée" : "Image masquée"}
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL de l'image
                    </label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => onImageUrlChange(e.target.value)}
                        placeholder="/cross-annonay.jpg ou https://..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        disabled={imageDisplayed}
                    />
                    <p className="text-sm text-gray-500 mt-2 flex items-start gap-2">
                        <span>💡</span>
                        <span>
                            {imageDisplayed
                                ? "Masquez l'image pour modifier l'URL"
                                : "Utilisez une URL complète (https://...) ou un chemin local depuis le dossier public (/image.jpg)"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ImageModePanel;
