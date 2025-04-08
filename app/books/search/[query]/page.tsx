import { notFound, redirect } from "next/navigation"
import { getBooks } from "@/lib/pocketbase"

interface SearchPageProps {
  params: {
    query: string
  }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const decodedQuery = decodeURIComponent(params.query)
  const books = await getBooks()
  
  // First try to find by exact title
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