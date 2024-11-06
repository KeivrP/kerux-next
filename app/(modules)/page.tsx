'use client';
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const modules = [
    { name: 'Módulo 1', icon: '🔧' },
    { name: 'Módulo 2', icon: '📊' },
    { name: 'Módulo 3', icon: '📅' },
    { name: 'Módulo 4', icon: '⚙️' },
    { name: 'Módulo 5', icon: '📈' },
  ];  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
    <h1 className="text-3xl font-bold mb-8">¡Bienvenido a la Aplicación!</h1>
    <h1 className="text-3xl font-bold mb-8">{session?.user.name}</h1>
    <div className="flex flex-wrap justify-center">
      {modules.map((module, index) => (
        <div
          className="bg-white border border-gray-300 rounded-lg shadow-md p-4 m-2 flex flex-col items-center transition-transform transform hover:scale-105"
          key={index}
        >
          <span className="text-4xl">{module.icon}</span>
          <span className="mt-2 font-semibold">{module.name}</span>
        </div>
      ))}
    </div>
  </div>
  );
}
