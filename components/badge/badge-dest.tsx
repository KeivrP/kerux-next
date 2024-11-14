import { CircleCheck, CircleMinus, MapPinHouse, Send } from "lucide-react";
import React from "react";

interface BadgeActProps {
    item: "DEST" | "ORIG";
}

export function BadgeDest({ item }: BadgeActProps) {
    const getTooltip = (item: "DEST" | "ORIG") => {
        switch (item) {
            case "DEST":
                return "Destino";
            case "ORIG":
                return "Origen";
            default:
                return "";
        }
    };

    return (
        <div className="relative group">
            <span className="flex justify-center items-center">
                {item === "DEST" ? (
                    <MapPinHouse className="text-blue-500" />
                ) : (
                    <Send className="text-green-500" />
                )}
            </span>
            <div
                className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                role="tooltip"
            >
                {getTooltip(item)}
            </div>
        </div>
    );
}
