'use client'

import { useState, useEffect } from 'react'
import { Pokemon } from '@/lib/types'
import { getPokemonByName } from '@/lib/api'
import PokemonCard from './PokemonCard'
import Loading from './Loading'

interface FavoritesListProps {
  searchQuery: string
}

export default function FavoritesList({ searchQuery }: FavoritesListProps) {
  const [favorites, setFavorites] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favoritesNames = JSON.parse(localStorage.getItem('pokemon-favorites') || '[]')
        const pokemonPromises = favoritesNames.map((name: string) => getPokemonByName(name))
        const favoritePokemon = await Promise.all(pokemonPromises)
        setFavorites(favoritePokemon)
      } catch (error) {
        console.error('Failed to load favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [])

  if (loading) return <Loading />

  const filteredFavorites = searchQuery
    ? favorites.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : favorites

  if (filteredFavorites.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {searchQuery ? 'No matching favorites found' : 'No favorite Pokémon yet'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredFavorites.map((pokemon) => (
        <PokemonCard 
          key={pokemon.id} 
          pokemon={pokemon}
          onFavoriteChange={() => {
            setFavorites(favorites.filter(p => p.id !== pokemon.id))
          }}
        />
      ))}
    </div>
  )
}

