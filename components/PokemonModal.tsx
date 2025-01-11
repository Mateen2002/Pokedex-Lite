import { Pokemon } from "@/lib/types";
import Image from "next/image";
import { X } from "lucide-react";

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-4">
            <Image
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Types</h3>
              <div className="flex gap-2">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className="px-3 py-1 rounded-full text-sm bg-gray-100"
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Stats</h3>
              <div className="space-y-2">
                {pokemon.stats.map(({ stat, base_stat }) => (
                  <div key={stat.name} className="flex items-center">
                    <span className="w-32 capitalize">{stat.name}:</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(base_stat / 255) * 100}%` }} // Fixed width calculation
                      />
                    </div>
                    <span className="ml-2 w-8 text-sm">{base_stat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <span
                    key={ability.name}
                    className={`px-3 py-1 rounded-full text-sm ${
                      is_hidden ? "bg-purple-100" : "bg-gray-100"
                    }`}
                  >
                    {ability.name}
                    {is_hidden && " (Hidden)"}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">Height</h3>
                <p>{pokemon.height / 10}m</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Weight</h3>
                <p>{pokemon.weight / 10}kg</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
