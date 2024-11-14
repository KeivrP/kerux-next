import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">   

      <Image
        src="/404img.png" // Reemplaza con la ruta de tu imagen
        alt="Página no encontrada"
        width={800}
        height={800}
      />
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p className="text-lg mb-4">Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/">
        <button className="bg-[#142F62] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}