import { Music } from "lucide-react";

function MusicCredit({ music }) {
    if (!music) return null;

    return (
        <div className="mt-2 bg-gray-900/90 backdrop-blur border border-gray-700/50 rounded-lg px-3 py-2 text-xs text-gray-300">
            <div className="flex items-start gap-2">
                <Music className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                        <span className="font-semibold">
                            The Titre:{" "}
                            <span className="text-purple-300">
                                {music.titre}
                            </span>
                        </span>
                        <span className="text-gray-500">-</span>
                        <span className="font-semibold">
                            Auteur:{" "}
                            <span className="text-gray-400">
                                {music.auteur}
                            </span>
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                        <span className="font-semibold">
                            Source:{" "}
                            <a
                                href={music.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors underline"
                            >
                                {music.source}
                            </a>
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                        <span className="font-semibold">
                            Licence:{" "}
                            <a
                                href={music.licence}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors underline"
                            >
                                {music.licence}
                            </a>
                        </span>
                        <span className="text-gray-500">-</span>
                        <span className="font-semibold">
                            Téléchargement:{" "}
                            <a
                                href={music.telechargement}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors underline"
                            >
                                {music.telechargement}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicCredit;
