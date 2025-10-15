// src/components/control/ControlStatusIndicators.jsx

function ControlStatusIndicators({ currentMusic, savedPodimsCount }) {
    return (
        <>
            {currentMusic && (
                <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                    <span className="text-purple-700 text-sm font-medium flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        Musique active
                    </span>
                </div>
            )}

            {savedPodimsCount > 0 && (
                <span className="px-3 py-2 bg-green-50 text-green-700 rounded-lg font-medium text-sm whitespace-nowrap border border-green-200">
                    💾 {savedPodimsCount} podium
                    {savedPodimsCount > 1 ? "s" : ""}
                </span>
            )}
        </>
    );
}

export default ControlStatusIndicators;
