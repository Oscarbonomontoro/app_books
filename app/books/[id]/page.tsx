import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getBook, getUserTradesByBookId, getFileURL } from "@/lib/pocketbase"

interface BookPageProps {
  params: {
    id: string
  }
}

export default async function BookPage({ params }: BookPageProps) {
  // Esperar a que los parámetros estén disponibles
  const { id } = params
  const book = await getBook(id)

  if (!book) {
    notFound()
  }

  // Find the user who owns this book
  const bookTradesResult = await getUserTradesByBookId(book.id)
  const bookTrade = bookTradesResult.items.length > 0 ? bookTradesResult.items[0] : null
  const bookOwner = bookTrade?.expand?.user_id

  // Generate image URL or use placeholder
  const imageUrl = book.imagen_libro
    ? getFileURL("books", book.id, book.imagen_libro)
    : `/placeholder.svg?height=600&width=450&text=${encodeURIComponent(book.titulo)}`

  // Generate owner image URL or use placeholder
  const ownerImageUrl = bookOwner?.imagen_usuario
    ? getFileURL("users", bookOwner.id, bookOwner.imagen_usuario)
    : `/placeholder.svg?text=${bookOwner?.nombre.charAt(0) || "U"}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
          <Image src={imageUrl || "/placeholder.svg"} alt={book.titulo} fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{book.titulo}</h1>
          <p className="text-xl text-muted-foreground mb-4">by {book.autor}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full">{book.categoria}</span>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold">Description</h2>
            <p>{book.descripcion}</p>

            {book.observaciones && (
              <>
                <h2 className="text-xl font-semibold">Notes</h2>
                <p>{book.observaciones}</p>
              </>
            )}
          </div>

          {bookOwner && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Shared by</h2>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ownerImageUrl} />
                    <AvatarFallback>
                      {bookOwner.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{bookOwner.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {bookOwner.provincia}, {bookOwner.pais}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      📧 {bookOwner.mail}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      📱 {bookOwner.telefono || "No disponible"}
                    </p>
                  </div>
                  <Button asChild variant="outline" className="ml-auto">
                    <Link href={`/profile/${bookOwner.id}`}>
                      Ver Perfil
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button size="lg" className="flex-1">
              Pedir prestado
            </Button>
            <Button variant="outline" size="lg">
              Guardar para después
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
