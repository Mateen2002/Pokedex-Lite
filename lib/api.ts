import { PokemonListResponse, Pokemon, PokemonType } from './types'

const API_BASE = 'https://pokeapi.co/api/v2'

export async function getPokemonList(page: number = 1, limit: number = 20): Promise<PokemonListResponse> {
  const offset = (page - 1) * limit
  const response = await fetch(
    `${API_BASE}/pokemon?offset=${offset}&limit=${limit}`
  )
  return response.json()
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const response = await fetch(`${API_BASE}/pokemon/${name.toLowerCase()}`)
  return response.json()
}

export async function getPokemonTypes(): Promise<PokemonType[]> {
  const response = await fetch(`${API_BASE}/type`)
  const data = await response.json()
  return data.results
}

export async function getPokemonByType(type: string): Promise<Pokemon[]> {
  const response = await fetch(`${API_BASE}/type/${type}`)
  const data = await response.json()
  
  const pokemonPromises = data.pokemon
    .slice(0, 20) // Limit to 20 Pokemon per type to avoid too many requests
    .map((p: { pokemon: { url: string } }) => 
      fetch(p.pokemon.url).then(res => res.json())
    )
    
  return Promise.all(pokemonPromises)
}

