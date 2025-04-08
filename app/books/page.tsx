'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BookCard } from "@/components/book-card"
import { getBooks } from "@/lib/pocketbase"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function BooksPage() {
  const searchParams = useSearchParams()
  const books = await getBooks()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Set initial category from URL if present
  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category.toLowerCase())
    }
  }, [searchParams])

  // Filter books based on category and search query
  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === "all" || book.categoria.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = book.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.autor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Books</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input 
            placeholder="Search books by title or author..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="novela">Novela</SelectItem>
              <SelectItem value="clasico">Clásico</SelectItem>
              <SelectItem value="ficcion">Ficción</SelectItem>
              <SelectItem value="no-ficcion">No Ficción</SelectItem>
              <SelectItem value="programacion">Programación</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
