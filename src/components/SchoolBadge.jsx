import { GraduationCap } from "lucide-react";
import { getEcoleById } from "../data/ecoles";

function SchoolBadge({ schoolId, compact = false }) {
    if (!schoolId) return null;

    const school = getEcoleById(schoolId);
    if (!school) return null;

    if (compact) {
        // Version compacte pour l'affichage du podium
        return (
            <div className="flex items-center gap-1.5 text-xs">
                <GraduationCap className="w-3 h-3 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 truncate">{school.nom}</span>
            </div>
        );
    }

    // Version complète
    return (
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5">
            <GraduationCap className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <div className="min-w-0 flex-1">
                <p className="text-blue-300 text-sm font-medium truncate">
                    {school.nom}
                </p>
            </div>
        </div>
    );
}

export default SchoolBadge;
