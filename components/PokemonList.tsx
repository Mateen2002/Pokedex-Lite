'use client'

import { useEffect, useState } from 'react'
import { Pokemon } from '@/lib/types'
import { getPokemonList, getPokemonByType } from '@/lib/api'
import PokemonCard from './PokemonCard'
import Loading from './Loading'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PokemonListProps {
  searchQuery: string
  selectedType: string
  page: number
  onPageChange: (page: number) => void
}

export default function PokemonList({ 
  searchQuery, 
  selectedType, 
  page, 
  onPageChange 
}: PokemonListProps) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true)
        setError(null)

        if (selectedType) {
          const typeResults = await getPokemonByType(selectedType)
          setPokemon(typeResults)
          setTotalPages(Math.ceil(typeResults.length / 20))
        } else {
          const results = await getPokemonList(page)
          const pokemonDetails = await Promise.all(
            results.results.map(p => fetch(p.url).then(res => res.json()))
          )
          setPokemon(pokemonDetails)
          setTotalPages(Math.ceil(results.count / 20))
        }
      } catch (err) {
        setError('Failed to fetch Pokemon')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [selectedType, page])

  if (loading) return <Loading />
  if (error) return <div className="text-red-500 text-center">{error}</div>

  const filteredPokemon = searchQuery
    ? pokemon.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pokemon

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

