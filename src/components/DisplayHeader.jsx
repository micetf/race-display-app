import { Flag } from "lucide-react";
import Clock from "./Clock";

function DisplayHeader() {
    return (
        <div className="mb-responsive-md relative">
            {/* Horloge positionnée en haut à droite du container parent, avec marge */}
            <div className="absolute z-10" style={{ top: "1vh", right: "1vw" }}>
                <Clock />
            </div>

            {/* Contenu principal du header - centré */}
            <div className="text-center">
                {/* <div className="inline-block mb-responsive-sm">
                    <Flag className="icon-lg text-blue-500 mx-auto" />
                </div> */}
                <h1 className="text-responsive-2xl font-black text-white tracking-tight leading-tight">
                    CROSS SCOLAIRE D'ANNONAY
                </h1>
                <p className="text-responsive-md text-gray-400 font-semibold mt-responsive-sm">
                    16 OCTOBRE 2025
                </p>
                <div
                    className="mx-auto rounded-full mt-responsive-sm"
                    style={{
                        height: "0.3vh",
                        width: "10vw",
                        background:
                            "linear-gradient(to right, rgb(59, 130, 246), rgb(168, 85, 247), rgb(236, 72, 153))",
                    }}
                ></div>
            </div>
        </div>
    );
}

export default DisplayHeader;
