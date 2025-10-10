import { Flag } from "lucide-react";

function DisplayHeader() {
    return (
        <div className="text-center mb-4">
            <div className="inline-block mb-1">
                <Flag className="w-10 h-10 text-blue-500 mx-auto" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
                CROSS SCOLAIRE D'ANNONAY
            </h1>
            <p className="text-lg text-gray-400 font-semibold">
                16 OCTOBRE 2025
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mt-1"></div>
        </div>
    );
}

export default DisplayHeader;
