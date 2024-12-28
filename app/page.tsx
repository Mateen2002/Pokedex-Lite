'use client'

import { useState } from 'react'
import PokemonList from '@/components/PokemonList'
import SearchBar from '@/components/SearchBar'
import TypeFilter from '@/components/TypeFilter'
import FavoritesList from '@/components/FavoritesList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginButton from '@/components/LoginButton'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFavorites, setShowFavorites] = useState(false)

  return (
    <main className="container mx-auto px-4 py-8">
       <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Pokedex Lite</h1>
          <LoginButton />
        </div>
        
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all" onClick={() => setShowFavorites(false)}>
            All Pokemon
          </TabsTrigger>
          <TabsTrigger value="favorites" onClick={() => setShowFavorites(true)}>
            Favorites
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="space-y-4">
            <SearchBar onSearch={setSearchQuery} />
            <TypeFilter onTypeSelect={setSelectedType} />
            {!showFavorites && (
              <PokemonList 
                searchQuery={searchQuery}
                selectedType={selectedType}
                page={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          {showFavorites && <FavoritesList searchQuery={searchQuery} />}
        </TabsContent>
      </Tabs>
    </main>
  )
}
