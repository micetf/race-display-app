import { useState } from "react";
import { Image, Upload, Link, FileImage, X } from "lucide-react";

function ImageSelector({ imageUrl, imageDisplayed, onImageUrlChange }) {
    const [imageSource, setImageSource] = useState("local"); // 'local', 'upload', 'web'
    const [uploadedFile, setUploadedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Images locales prédéfinies
    const localImages = [
        {
            id: "cross-annonay",
            url: "./cross-annonay.jpg",
            name: "Affiche Cross Annonay",
        },
        {
            id: "cross-annonay-with-logos",
            url: "./cross-annonay.png",
            name: "Affiche Cross Annonay avec logos",
        },
    ];

    const handleSourceChange = (newSource) => {
        setImageSource(newSource);

        // Réinitialiser selon la source
        if (newSource === "local") {
            onImageUrlChange(localImages[0].url);
            setPreviewUrl(null);
        } else if (newSource === "upload") {
            setPreviewUrl(null);
        } else if (newSource === "web") {
            onImageUrlChange("");
        }
    };

    const handleLocalImageSelect = (url) => {
        onImageUrlChange(url);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Vérifier que c'est bien une image
        if (!file.type.startsWith("image/")) {
            alert("Veuillez sélectionner un fichier image valide");
            return;
        }

        // Vérifier la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("L'image ne doit pas dépasser 5 MB");
            return;
        }

        setUploadedFile(file);

        // Créer une URL de prévisualisation
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            setPreviewUrl(dataUrl);
            onImageUrlChange(dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveUpload = () => {
        setUploadedFile(null);
        setPreviewUrl(null);
        onImageUrlChange("");
    };

    const handleWebUrlChange = (url) => {
        onImageUrlChange(url);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Sélection de l'Image
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

            {/* Sélecteur de source */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Source de l'image
                </label>
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={() => handleSourceChange("local")}
                        disabled={imageDisplayed}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                            imageSource === "local"
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        } ${imageDisplayed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <FileImage className="w-5 h-5" />
                        <span className="font-medium">Images locales</span>
                    </button>

                    <button
                        onClick={() => handleSourceChange("upload")}
                        disabled={imageDisplayed}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                            imageSource === "upload"
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        } ${imageDisplayed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <Upload className="w-5 h-5" />
                        <span className="font-medium">Uploader</span>
                    </button>

                    <button
                        onClick={() => handleSourceChange("web")}
                        disabled={imageDisplayed}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                            imageSource === "web"
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        } ${imageDisplayed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <Link className="w-5 h-5" />
                        <span className="font-medium">URL Web</span>
                    </button>
                </div>
            </div>

            {/* Contenu selon la source sélectionnée */}
            <div className="space-y-4">
                {/* Images locales */}
                {imageSource === "local" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Choisir une image
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {localImages.map((img) => (
                                <button
                                    key={img.id}
                                    onClick={() =>
                                        handleLocalImageSelect(img.url)
                                    }
                                    disabled={imageDisplayed}
                                    className={`relative group overflow-hidden rounded-lg border-2 transition-all ${
                                        imageUrl === img.url
                                            ? "border-indigo-500 ring-2 ring-indigo-200"
                                            : "border-gray-300 hover:border-indigo-300"
                                    } ${imageDisplayed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <Image className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <div className="p-2 bg-white">
                                        <p className="text-xs font-medium text-gray-700 truncate">
                                            {img.name}
                                        </p>
                                    </div>
                                    {imageUrl === img.url && (
                                        <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full p-1">
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-3 flex items-start gap-2">
                            <span>💡</span>
                            <span>
                                Les images doivent être placées dans le dossier{" "}
                                <code className="bg-gray-100 px-1 rounded">
                                    public/
                                </code>
                            </span>
                        </p>
                    </div>
                )}

                {/* Upload d'image */}
                {imageSource === "upload" && (
                    <div>
                        {!uploadedFile ? (
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                                    <p className="mb-2 text-sm text-gray-700 font-medium">
                                        Cliquez pour uploader une image
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, WEBP (max 5 MB)
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={imageDisplayed}
                                />
                            </label>
                        ) : (
                            <div className="space-y-3">
                                {/* Prévisualisation */}
                                {previewUrl && (
                                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-300">
                                        <img
                                            src={previewUrl}
                                            alt="Prévisualisation"
                                            className="w-full h-64 object-contain bg-gray-100"
                                        />
                                        {!imageDisplayed && (
                                            <button
                                                onClick={handleRemoveUpload}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Info fichier */}
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 text-sm text-green-800">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="font-medium">
                                            {uploadedFile.name}
                                        </span>
                                        <span className="text-green-600">
                                            (
                                            {(
                                                uploadedFile.size /
                                                1024 /
                                                1024
                                            ).toFixed(2)}{" "}
                                            MB)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* URL Web */}
                {imageSource === "web" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL de l'image
                        </label>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => handleWebUrlChange(e.target.value)}
                            placeholder="https://exemple.com/image.jpg"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            disabled={imageDisplayed}
                        />
                        <p className="text-sm text-gray-500 mt-3 flex items-start gap-2">
                            <span>💡</span>
                            <span>
                                {imageDisplayed
                                    ? "Masquez l'image pour modifier l'URL"
                                    : "Collez l'URL complète d'une image en ligne (doit commencer par https://)"}
                            </span>
                        </p>
                    </div>
                )}
            </div>

            {/* Message d'aide général */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                    <span>ℹ️</span>
                    <span>
                        {imageSource === "local" &&
                            "Sélectionnez une des images prédéfinies dans le dossier public."}
                        {imageSource === "upload" &&
                            "Uploadez une image depuis votre ordinateur. Elle sera stockée temporairement dans le navigateur."}
                        {imageSource === "web" &&
                            "Utilisez une image hébergée sur Internet. Assurez-vous que l'URL est accessible publiquement."}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default ImageSelector;
