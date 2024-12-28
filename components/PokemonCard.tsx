'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Pokemon } from '@/lib/types'
import PokemonModal from './PokemonModal'

interface PokemonCardProps {
  pokemon: Pokemon
  onFavoriteChange?: () => void
}

export default function PokemonCard({ pokemon, onFavoriteChange }: PokemonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('pokemon-favorites') || '[]')
    setIsFavorite(favorites.includes(pokemon.name))
  }, [pokemon.name])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem('pokemon-favorites') || '[]')
    
    let newFavorites
    if (isFavorite) {
      newFavorites = favorites.filter((name: string) => name !== pokemon.name)
    } else {
      newFavorites = [...favorites, pokemon.name]
    }
    
    localStorage.setItem('pokemon-favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
    onFavoriteChange?.()
  }

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative">
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            width={200}
            height={200}
            className="mx-auto"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
          >
            <Heart
              className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
          <div className="flex gap-2 justify-center mt-2">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="px-2 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <PokemonModal pokemon={pokemon} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
