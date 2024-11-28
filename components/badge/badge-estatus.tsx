import React from "react";

interface BadgeProps {
  tipo: string;
  label?: string;
}

export const BadgeTipodoc: React.FC<BadgeProps> = ({ tipo }) => {
    const commonClasses = "inline-flex items-center text-xs font-medium mr-2 pl-3 pr-3 rounded-full py-1.5";
    
    switch (tipo) {
        case "RCM":
            return (
                <span className={`${commonClasses} bg-gray-100 text-gray-700`}>
                    {tipo}
                </span>
            );
        case "RCH":
            return (
                <span className={`${commonClasses} bg-indigo-50 text-indigo-500`}>
                    {tipo}
                </span>
            );
        case "REC":
            return (
                <span className={`${commonClasses} bg-red-50 text-red-600`}>
                    {tipo}
                </span>
            );
        case "PRO":
            return (
                <span className={`${commonClasses} bg-amber-50 text-amber-600`}>
                    {tipo}
                </span>
            );
        case "GEN":
            return (
                <span className={`${commonClasses} bg-emerald-50 text-emerald-600`}>
                    {tipo}
                </span>
            );
        case "INS":
            return (
                <span className={`${commonClasses} bg-blue-50 text-blue-600`}>
                    {tipo}
                </span>
            );
        case "INV":
            return (
                <span className={`${commonClasses} bg-purple-50 text-purple-600`}>
                    {tipo}
                </span>
            );
        case "DEV":
            return (
                <span className={`${commonClasses} bg-pink-50 text-pink-600`}>
                    {tipo}
                </span>
            );
        default:
            return <span>{tipo}</span>;
    }
};

export const BadgeTipoComp: React.FC<BadgeProps> = ({ tipo }) => {
    const commonClasses = "inline-flex items-center text-xs font-medium mr-2 pl-3 pr-3 rounded-full py-1.5";
    
    switch (tipo) {
        case "PEN":
            return (
                <span className={`${commonClasses} bg-gray-100 text-gray-700`}>
                    {tipo}
                </span>
            );
        case "RCH":
            return (
                <span className={`${commonClasses} bg-indigo-50 text-indigo-500`}>
                    {tipo}
                </span>
            );
        case "REC":
            return (
                <span className={`${commonClasses} bg-red-50 text-red-600`}>
                    {tipo}
                </span>
            );
        case "PRO":
            return (
                <span className={`${commonClasses} bg-amber-50 text-amber-600`}>
                    {tipo}
                </span>
            );
        case "GEN":
            return (
                <span className={`${commonClasses} bg-emerald-50 text-emerald-600`}>
                    {tipo}
                </span>
            );
        case "INS":
            return (
                <span className={`${commonClasses} bg-blue-50 text-blue-600`}>
                    {tipo}
                </span>
            );
        case "INV":
            return (
                <span className={`${commonClasses} bg-purple-50 text-purple-600`}>
                    {tipo}
                </span>
            );
        case "DEV":
            return (
                <span className={`${commonClasses} bg-pink-50 text-pink-600`}>
                    {tipo}
                </span>
            );
        default:
            return <span>{tipo}</span>;
    }
};

