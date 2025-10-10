// Styles de médailles pour le podium
export const getMedalStyle = (position) => {
    const medals = {
        1: {
            gradient: "from-yellow-400 to-amber-500",
            shadow: "shadow-yellow-500/50",
            text: "text-amber-400",
            border: "border-amber-400",
            glow: "shadow-lg shadow-yellow-400/30",
        },
        2: {
            gradient: "from-gray-300 to-gray-400",
            shadow: "shadow-gray-400/50",
            text: "text-gray-300",
            border: "border-gray-300",
            glow: "shadow-lg shadow-gray-300/30",
        },
        3: {
            gradient: "from-orange-600 to-amber-700",
            shadow: "shadow-orange-600/50",
            text: "text-orange-400",
            border: "border-orange-500",
            glow: "shadow-lg shadow-orange-500/30",
        },
    };

    return (
        medals[position] || {
            gradient: "from-blue-500 to-blue-600",
            shadow: "shadow-blue-500/50",
            text: "text-blue-400",
            border: "border-blue-500",
            glow: "shadow-md shadow-blue-400/20",
        }
    );
};
