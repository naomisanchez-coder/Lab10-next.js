'use client';

import { useEffect } from 'react';
import { IoWarning } from 'react-icons/io5';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl max-w-md w-full border border-red-500/30 shadow-2xl">
        <IoWarning className="text-red-400 text-6xl mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-white mb-2">¡Algo salió mal!</h2>
        <p className="text-purple-200 mb-6 text-sm">
          {error.message || 'Ocurrió un error inesperado al procesar la solicitud.'}
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}