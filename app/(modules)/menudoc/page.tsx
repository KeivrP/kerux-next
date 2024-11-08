'use client'
import { useEffect, useState } from 'react';

export default function Home() {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFade(true);
        }, 500); // Esperar medio segundo antes de mostrar el contenido

        return () => clearTimeout(timer); // Limpiar el timer
    }, []);

    return (
            <div className={`flex items-center justify-center h-full bg-gradient-to-r from-blue-400 to-purple-600 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center bg-white rounded-lg shadow-lg p-8 transform transition-transform duration-500 hover:scale-105">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse">¡Bienvenido al Módulo de Documentos!</h1>
                    <p className="text-lg text-gray-600 mb-8">Gestiona tus documentos de forma eficiente y sencilla.</p>
                    
                </div>
            </div>
    );
}