import Link from 'next/link';
import { IoSearchOutline } from 'react-icons/io5';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl max-w-md w-full border border-yellow-500/30 shadow-2xl">
        <IoSearchOutline className="text-yellow-400 text-6xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">404 - No Encontrado</h2>
        <p className="text-purple-200 mb-6 text-sm">
          El Pokémon o la página que estás buscando no existe en nuestro Pokédex.
        </p>
        <Link
          href="/pokemon"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
        >
          Volver a la Pokédex
        </Link>
      </div>
    </div>
  );
}