import Link from "next/link";
import { IoGameController, IoPlanet } from "react-icons/io5";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl text-center space-y-8">
        
        {/* Encabezado Principal */}
        <div className="space-y-3">
          <span className="inline-block bg-amber-100/80 text-amber-900 font-semibold text-xs px-3.5 py-1 rounded-full border border-amber-200/60 shadow-xs">
            Tecsup • Desarrollo Web Avanzado
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Laboratorio N° 10
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Enrutamiento y Páginas Dinámicas en Next.js (SSG, ISR, SSR y CSR).
          </p>
        </div>

        {/* Tarjetas de Acceso Directo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Tarjeta Pokédex */}
          <Link
            href="/pokemon"
            className="group bg-white border border-stone-200/80 hover:border-purple-400 rounded-2xl p-8 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center space-y-4"
          >
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform border border-purple-100">
              <IoGameController />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition">
                Ejercicio 1: Pokédex
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Explora los 151 Pokémon implementando SSG, ISR de 24h y rutas dinámicas.
              </p>
            </div>
            <span className="text-purple-600 font-bold text-sm pt-2 group-hover:underline">
              Ir a Pokédex →
            </span>
          </Link>

          {/* Tarjeta Rick and Morty */}
          <Link
            href="/rickandmorty"
            className="group bg-white border border-stone-200/80 hover:border-emerald-500 rounded-2xl p-8 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center space-y-4"
          >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform border border-emerald-100">
              <IoPlanet />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition">
                Tarea: Rick & Morty
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Búsqueda en tiempo real (CSR), detalle con mapeo completo e ISR a 10 días.
              </p>
            </div>
            <span className="text-emerald-600 font-bold text-sm pt-2 group-hover:underline">
              Ir al Portal →
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
}