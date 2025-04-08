import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type Book, getFileURL } from "@/lib/pocketbase"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  // Generate image URL or use placeholder
  const imageUrl = book.imagen_libro
    ? getFileURL("books", book.id, book.imagen_libro)
    : `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(book.titulo)}`

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/4] relative">
        <Image src={imageUrl || "/placeholder.svg"} alt={book.titulo} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg line-clamp-1">{book.titulo}</h3>
        <p className="text-sm text-muted-foreground mb-2">{book.autor}</p>
        <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{book.categoria}</span>
        <p className="mt-2 text-sm line-clamp-2">{book.descripcion}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/books/${book.id}`}>Ver detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
