import { notFound, redirect } from "next/navigation"
import { getBooks } from "@/lib/pocketbase"

interface SearchPageProps {
  params: {
    query: string
  }
}

// Helper function to validate PocketBase ID
function isValidPocketBaseId(id: string): boolean {
  // PocketBase IDs are typically 24 characters long
  return /^[a-z0-9]{24}$/.test(id)
}

export default async function SearchPage({ params }: SearchPageProps) {
  const decodedQuery = decodeURIComponent(params.query)
  const books = await getBooks()
  
  // First check if this is a valid PocketBase ID
  if (isValidPocketBaseId(decodedQuery)) {
    // If it's a valid ID, try to find the book by that ID
    const bookById = books.find(book => book.id === decodedQuery)
    if (bookById) {
      redirect(`/books/${bookById.id}`)
    }
  }

  // If not found by ID, try to find by exact title
  const bookByTitle = books.find(book => 
    book.titulo.toLowerCase() === decodedQuery.toLowerCase()
  )
  
  if (bookByTitle) {
    redirect(`/books/${bookByTitle.id}`)
  }

  // If not found by title, check if it's a category
  const booksInCategory = books.filter(book => 
    book.categoria.toLowerCase() === decodedQuery.toLowerCase()
  )

  if (booksInCategory.length > 0) {
    // Redirect to main books page with category pre-selected
    redirect(`/books?category=${encodeURIComponent(decodedQuery)}`)
  }

  notFound()
}