import { Flag } from "lucide-react";

function DisplayHeader() {
    return (
        <div className="text-center mb-2">
            <div className="inline-block mb-0.5">
                <Flag className="w-6 h-6 text-blue-500 mx-auto" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight leading-tight">
                CROSS SCOLAIRE D'ANNONAY
            </h1>
            <p className="text-sm text-gray-400 font-semibold">
                16 OCTOBRE 2025
            </p>
            <div className="h-0.5 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mt-0.5"></div>
        </div>
    );
}

export default DisplayHeader;
