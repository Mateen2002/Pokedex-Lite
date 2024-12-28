'use client'

import { useState } from 'react'
import PokemonList from '@/components/PokemonList'
import SearchBar from '@/components/SearchBar'
import TypeFilter from '@/components/TypeFilter'
import FavoritesList from '@/components/FavoritesList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFavorites, setShowFavorites] = useState(false)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Pokedex Lite</h1>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all" onClick={() => setShowFavorites(false)}>
            All Pokemon
          </TabsTrigger>
          <TabsTrigger value="favorites" onClick={() => setShowFavorites(true)}>
            Favorites
          </TabsTrigger>
        </TabsList>
        
        {/* Show "All Pokemon" tab content */}
        <TabsContent value="all">
          <div className="space-y-4">
            <SearchBar onSearch={setSearchQuery} />
            <TypeFilter onTypeSelect={setSelectedType} />
            <PokemonList 
              searchQuery={searchQuery}
              selectedType={selectedType}
              page={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </TabsContent>
        
        {/* Show "Favorites" tab content */}
        <TabsContent value="favorites">
          <FavoritesList searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
