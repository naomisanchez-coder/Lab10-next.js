import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Character, RickAndMortyResponse } from '@/types/rickandmorty';
import { IoArrowBack, IoFilmOutline, IoLocationOutline, IoPulseOutline, IoTimeOutline, IoPersonOutline } from 'react-icons/io5';

interface CharacterPageProps {
  params: {
    id: string;
  };
}

// Petición con Revalidación ISR cada 10 días (864,000 segundos)
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 } // 10 días
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error('Error al obtener la información del personaje');
  }

  return res.json();
}

// Genera las rutas estáticas pre-renderizadas en el build (SSG)
export async function generateStaticParams() {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  if (!res.ok) return [];
  const data: RickAndMortyResponse = await res.json();

  return data.results.map((character) => ({
    id: character.id.toString(),
  }));
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const character = await getCharacter(id);
    return {
      title: `${character.name} - Rick & Morty Portal`,
      description: `Detalles sobre ${character.name}`,
    };
  } catch {
    return {
      title: 'Personaje no encontrado',
    };
  }
}

export default async function CharacterDetailPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6 px-4">
      <Link
        href="/rickandmorty"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 font-semibold transition"
      >
        <IoArrowBack /> Volver a la lista de personajes
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Lado izquierdo: Imagen con tamaño controlado */}
          <div className="flex-shrink-0 text-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-lg mx-auto">
              <Image
                src={character.image}
                alt={character.name}
                width={300}
                height={300}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`inline-block mt-4 px-4 py-1.5 rounded-full text-xs font-bold shadow-md ${
                character.status === 'Alive'
                  ? 'bg-emerald-500 text-black'
                  : character.status === 'Dead'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-600 text-white'
              }`}
            >
              Estado: {character.status}
            </span>
          </div>

          {/* Lado derecho: Detalles completos mapeados */}
          <div className="flex-1 space-y-5 w-full">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{character.name}</h1>
              <p className="text-emerald-400 font-medium capitalize text-sm mt-1">
                {character.species} {character.type ? `• ${character.type}` : ''}
              </p>
            </div>

            <div className="space-y-3 text-sm divide-y divide-slate-800 text-slate-300">
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-400 font-semibold flex items-center gap-2">
                  <IoPersonOutline className="text-emerald-400" /> Género:
                </span>
                <span className="font-bold text-white capitalize">{character.gender}</span>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <span className="text-slate-400 font-semibold flex items-center gap-2">
                  <IoLocationOutline className="text-emerald-400" /> Origen:
                </span>
                <span className="font-bold text-white text-right">{character.origin.name}</span>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <span className="text-slate-400 font-semibold flex items-center gap-2">
                  <IoPulseOutline className="text-emerald-400" /> Ubicación actual:
                </span>
                <span className="font-bold text-white text-right">{character.location.name}</span>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <span className="text-slate-400 font-semibold flex items-center gap-2">
                  <IoFilmOutline className="text-emerald-400" /> Episodios participados:
                </span>
                <span className="font-bold text-emerald-400">{character.episode.length} episodios</span>
              </div>

              <div className="pt-3 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-2">
                  <IoTimeOutline /> Creado en API:
                </span>
                <span className="text-slate-400">
                  {new Date(character.created).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}