import Link from "next/link";
import { IoGameController, IoPlanet } from "react-icons/io5";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-emerald-400 bg-clip-text text-transparent">
            Laboratorio N° 10
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Desarrollo de Aplicaciones Web Avanzado: Enrutamiento, Páginas Dinámicas (SSG, ISR, SSR y CSR).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Tarjeta Pokédex */}
          <Link
            href="/pokemon"
            className="group relative bg-slate-900 border border-slate-800 hover:border-purple-500 rounded-3xl p-8 transition-all duration-300 transform hover:-translate-y-2 shadow-xl flex flex-col items-center text-center space-y-4"
          >
            <div className="w-16 h-16 bg-purple-600/20 text-purple-400 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              <IoGameController />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition">
                Ejercicio 1: Pokédex
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Explora los 151 Pokémon implementando SSG, ISR de 24h y rutas dinámicas.
              </p>
            </div>
            <span className="text-purple-400 font-semibold text-sm pt-2 group-hover:underline">
              Ir a Pokédex →
            </span>
          </Link>

          {/* Tarjeta Rick and Morty */}
          <Link
            href="/rickandmorty"
            className="group relative bg-slate-900 border border-slate-800 hover:border-emerald-500 rounded-3xl p-8 transition-all duration-300 transform hover:-translate-y-2 shadow-xl flex flex-col items-center text-center space-y-4"
          >
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              <IoPlanet />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition">
                Tarea: Rick & Morty
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Búsqueda en tiempo real (CSR), detalle con mapeo completo e ISR a 10 días.
              </p>
            </div>
            <span className="text-emerald-400 font-semibold text-sm pt-2 group-hover:underline">
              Ir al Portal →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}