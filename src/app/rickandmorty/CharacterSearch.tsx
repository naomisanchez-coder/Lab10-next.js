'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Character } from '@/types/rickandmorty';
import { IoSearch, IoReload } from 'react-icons/io5';

interface CharacterSearchProps {
  initialCharacters: Character[];
}

export default function CharacterSearch({ initialCharacters }: CharacterSearchProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFilteredCharacters = async () => {
      setLoading(true);
      setError(false);

      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (status) params.append('status', status);
      if (type) params.append('type', type);
      if (gender) params.append('gender', gender);

      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
        if (!res.ok) {
          setCharacters([]);
          setError(true);
        } else {
          const data = await res.json();
          setCharacters(data.results || []);
        }
      } catch (err) {
        setError(true);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchFilteredCharacters();
    }, 300);

    return () => clearTimeout(timer);
  }, [name, status, type, gender]);

  const handleReset = () => {
    setName('');
    setStatus('');
    setType('');
    setGender('');
    setCharacters(initialCharacters);
    setError(false);
  };

  return (
    <div className="space-y-8">
      {/* Filtros de búsqueda (CSR) */}
      <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl mb-2">
          <IoSearch />
          <h2>Búsqueda y Filtros en Tiempo Real (CSR)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Ej: Rick, Morty..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white px-3 py-2 rounded-lg outline-none transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Estado (Status)</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white px-3 py-2 rounded-lg outline-none transition text-sm"
            >
              <option value="">Todos los estados</option>
              <option value="alive">Alive (Vivo)</option>
              <option value="dead">Dead (Muerto)</option>
              <option value="unknown">Unknown (Desconocido)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Tipo / Especie (Type)</label>
            <input
              type="text"
              placeholder="Ej: Genetic experiment..."
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white px-3 py-2 rounded-lg outline-none transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Género (Gender)</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white px-3 py-2 rounded-lg outline-none transition text-sm"
            >
              <option value="">Todos los géneros</option>
              <option value="female">Female (Femenino)</option>
              <option value="male">Male (Masculino)</option>
              <option value="genderless">Genderless (Sin género)</option>
              <option value="unknown">Unknown (Desconocido)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition border border-slate-700"
          >
            <IoReload /> Limpiar Filtros
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8 text-emerald-400 font-semibold animate-pulse">
          Buscando personajes en el multiverso...
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-950/40 border border-red-500/50 p-6 rounded-xl text-center text-red-300">
          No se encontraron personajes con los filtros seleccionados.
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="group bg-slate-900 border border-slate-800 hover:border-emerald-500 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={false} // Carga bajo demanda (Lazy Loading)
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                    character.status === 'Alive'
                      ? 'bg-emerald-500 text-black'
                      : character.status === 'Dead'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-600 text-white'
                  }`}
                >
                  {character.status}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition truncate">
                  {character.name}
                </h3>
                <p className="text-sm text-slate-400 mt-1 capitalize">
                  {character.species} {character.type ? `• ${character.type}` : ''}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                  <span>Género: <strong className="text-slate-300">{character.gender}</strong></span>
                  <span className="text-emerald-400 font-semibold group-hover:underline">Ver detalle →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}