import React from "react";

interface BadgeProps {
    tipo: string;
    label?: string;
}

export const commonClasses = "inline-flex items-center text-xs font-medium mr-2 pl-3 pr-3 rounded-full py-1.5";


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
        case "APR":
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
        case "REV":
            return (
                <span className={`${commonClasses} bg-pink-50 text-pink-600`}>
                    {tipo}
                </span>
            );
        default:
            return <span className={`${commonClasses} bg-gray-50 text-gray-600`} >{tipo}</span>;
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

export const BadgeSolSum: React.FC<BadgeProps> = ({ tipo }) => {
    switch (tipo) {
        case "PGN":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-indigo-100 text-indigo-500`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Por Generar
                    </span>
                </span>
            );
        case "PPA":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-amber-100 text-amber-500`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Pendiente aprobación de almacén
                    </span>
                </span>
            );
        case "PAE":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-amber-50 text-amber-500`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Pendiente aprobación externa
                    </span>
                </span>
            );
        case "ANU":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-red-50 text-red-600`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Anulado
                    </span>
                </span>
            );
        case "GEN":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-green-50 text-green-600`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Generado
                    </span>
                </span>
            );
        case "RCH":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-red-50 text-red-600`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                       Devuelto
                    </span>
                </span>
            );
        case "RAE":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-red-50 text-red-600`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Devuelto
                    </span>
                </span>
            );
        case "REV":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-amber-50 text-amber-600`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Revision
                    </span>
                </span>
            );

        default:
            return <span>{tipo}</span>;
    }
}

export const BadgeTipoEven: React.FC<BadgeProps> = ({ tipo }) => {
    switch (tipo) {
        case "RCM":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-indigo-100 text-indigo-500`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Recibido Manual
                    </span>
                </span>
            );
        case "PRO":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-green-100 text-green-500`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Procesado
                    </span>
                </span>
            );
        case "GEN":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-indigo-50 text-indigo-500`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Generado
                    </span>
                </span>
            );
        case "DEV":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-amber-50 text-amber-600`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Devuelto
                    </span>
                </span>
            );

        default:
            return <span>{tipo}</span>;
    }
}

export const BadgeStsDoc: React.FC<BadgeProps> = ({ tipo }) => {
    switch (tipo) {
        case "FIN":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-green-100 text-green-500`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Finalizado
                    </span>
                </span>
            );
        case "PRO":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-green-100 text-green-500`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Procesado
                    </span>
                </span>
            );
        case "ANU":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-red-50 text-red-500`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Anulado
                    </span>
                </span>
            );
        case "CRE":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-indigo-50 text-indigo-600`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Creado
                    </span>
                </span>
            );
        case "INS":
            return (
                <span className="relative group">

                    <span className={`${commonClasses} bg-amber-50 text-amber-600`}>
                        {tipo}
                    </span>
                    <span
                        className="absolute bottom-full left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-full bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);] opacity-0 group-hover:opacity-100"
                        role="tooltip"
                    >
                        Insertado
                    </span>
                </span>
            );

        default:
            return <span>{tipo}</span>;
    }
}




