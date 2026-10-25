import { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { IoPlanet, IoArrowBack } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Rick & Morty Portal - Next.js",
  description: "Explora los personajes del universo de Rick and Morty",
};

interface RickLayoutProps {
  children: ReactNode;
}

export default function RickLayout({ children }: RickLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-emerald-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <Link
            href="/rickandmorty"
            className="text-white text-2xl font-extrabold flex items-center gap-2 hover:text-emerald-400 transition"
          >
            <IoPlanet className="text-emerald-400 text-3xl animate-pulse" />
            <span>Rick & Morty Portal</span>
          </Link>

          <Link
            href="/pokemon"
            className="text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition flex items-center gap-2 border border-slate-700"
          >
            <IoArrowBack /> Ir a Pokédex
          </Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}