'use client'

import { useEffect, useState } from 'react'
import { getPokemonTypes } from '@/lib/api'

interface TypeFilterProps {
  onTypeSelect: (type: string) => void
}

export default function TypeFilter({ onTypeSelect }: TypeFilterProps) {
  const [types, setTypes] = useState<string[]>([])

  useEffect(() => {
    async function fetchTypes() {
      try {
        const typeData = await getPokemonTypes()
        setTypes(typeData.map(type => type.name))
      } catch (error) {
        console.error('Failed to fetch types:', error)
      }
    }
    fetchTypes()
  }, [])

  return (
    <select
      onChange={(e) => onTypeSelect(e.target.value)}
      className="w-full p-2 border rounded-lg"
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  )
}

