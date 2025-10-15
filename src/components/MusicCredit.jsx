import { Music } from "lucide-react";

/**
 * Composant unifié pour afficher les crédits musicaux - VERSION RESPONSIVE
 * CENTRÉ : La carte ET le contenu texte sont centrés
 */
function MusicCredit({ music, isPlaying = false, variant = "inline" }) {
    if (!music || !isPlaying) return null;

    // Variant "floating" : Carte visible en bas au CENTRE (mode image d'accueil)
    if (variant === "floating") {
        return (
            <div
                className="fixed left-1/2 bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-xl border-responsive-thick border-purple-500/40 rounded-responsive-xl shadow-2xl z-50 overflow-hidden"
                style={{
                    bottom: "2vh",
                    transform: "translateX(-50%)",
                    maxWidth: "90vw",
                    padding: "2vh 3vw",
                }}
            >
                <div className="flex items-center justify-center gap-responsive-md">
                    {/* Icône musicale animée */}
                    <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-full spacing-md">
                            <Music className="icon-md text-white" />
                        </div>
                    </div>

                    {/* Texte des crédits */}
                    <div className="text-responsive-sm text-gray-200 leading-relaxed text-center">
                        <span className="font-semibold text-white">Titre:</span>{" "}
                        <span className="text-purple-300">{music.titre}</span>{" "}
                        <span className="text-gray-500 mx-1">-</span>{" "}
                        <span className="font-semibold text-white">
                            Auteur:
                        </span>{" "}
                        <span className="text-gray-300">{music.auteur}</span>{" "}
                        <span className="text-gray-500 mx-1">-</span>{" "}
                        <span className="font-semibold text-white">
                            Source:
                        </span>{" "}
                        <a
                            href={music.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/50 hover:decoration-blue-300"
                        >
                            {music.source}
                        </a>{" "}
                        <span className="text-gray-500 mx-1">-</span>{" "}
                        <span className="font-semibold text-white">
                            Licence:
                        </span>{" "}
                        <a
                            href={music.licence}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/50 hover:decoration-blue-300"
                        >
                            {music.licence}
                        </a>{" "}
                        <span className="text-gray-500 mx-1">-</span>{" "}
                        <span className="font-semibold text-white">
                            Téléchargement:
                        </span>{" "}
                        <a
                            href={music.telechargement}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/50 hover:decoration-blue-300"
                        >
                            {music.telechargement}
                        </a>
                    </div>
                </div>

                {/* Barre décorative animée en bas */}
                <div
                    className="bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                    style={{ height: "0.2vh" }}
                ></div>
            </div>
        );
    }

    // Variant "inline" : Barre compacte intégrée au contenu (mode course)
    return (
        <div className="bg-gradient-to-r from-gray-900/95 via-purple-900/20 to-gray-900/95 backdrop-blur border-responsive-thick border-purple-500/30 rounded-responsive-lg shadow-lg overflow-hidden">
            <div className="spacing-md">
                {/* Icône et texte sur la même ligne */}
                <div className="flex items-center justify-center gap-responsive-md">
                    {/* Icône animée */}
                    <div className="relative flex-shrink-0">
                        <Music className="icon-sm text-purple-400 animate-pulse" />
                        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md animate-pulse"></div>
                    </div>

                    {/* Texte des crédits */}
                    <div className="text-responsive-xs text-gray-300 leading-relaxed text-center">
                        <span className="font-semibold text-white">Titre:</span>{" "}
                        <span className="text-purple-300">{music.titre}</span>{" "}
                        <span className="text-gray-600 mx-0.5">-</span>{" "}
                        <span className="font-semibold text-white">
                            Auteur:
                        </span>{" "}
                        <span className="text-gray-300">{music.auteur}</span>{" "}
                        <span className="text-gray-600 mx-0.5">-</span>{" "}
                        <span className="font-semibold text-white">
                            Source:
                        </span>{" "}
                        <a
                            href={music.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/50"
                        >
                            {music.source}
                        </a>{" "}
                        <span className="text-gray-600 mx-0.5">-</span>{" "}
                        <span className="font-semibold text-white">
                            Licence:
                        </span>{" "}
                        <a
                            href={music.licence}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/50"
                        >
                            {music.licence}
                        </a>{" "}
                        <span className="text-gray-600 mx-0.5">-</span>{" "}
                        <span className="font-semibold text-white">
                            Téléchargement:
                        </span>{" "}
                        <a
                            href={music.telechargement}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/50"
                        >
                            {music.telechargement}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicCredit;
