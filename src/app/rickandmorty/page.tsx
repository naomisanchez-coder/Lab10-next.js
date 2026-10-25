import { RickAndMortyResponse } from '@/types/rickandmorty';
import CharacterSearch from './CharacterSearch';
import { IoSparkles } from 'react-icons/io5';

async function getInitialCharacters() {
  // SSR + Cache (SSG) 
  const res = await fetch('https://rickandmortyapi.com/api/character', {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Error al cargar los personajes de Rick and Morty');
  }

  const data: RickAndMortyResponse = await res.json();
  return data.results;
}

export default function RickAndMortyPage() {
  return getInitialCharacters().then((initialCharacters) => (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
          <IoSparkles className="text-emerald-400" /> Personajes de Rick and Morty
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Explora el multiverso con renderizado híbrido (SSR + SSG inicial con búsqueda CSR en tiempo real).
        </p>
      </div>

      <CharacterSearch initialCharacters={initialCharacters} />
    </div>
  ));
}