import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookCard } from "@/components/book-card"
import { getUserByName, getUserTradesByUserId, getFileUrl } from "@/lib/pocketbase"
import { type Book } from "@/lib/pocketbase"

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  // Buscar el usuario por nombre
  const user = await getUserByName(params.username)

  if (!user) {
    notFound()
  }

  // Obtener los libros del usuario
  const trades = await getUserTradesByUserId(user.id)
  const books = trades.items.map(trade => trade.expand?.books_id)

  // Generar URL de la imagen del usuario
  const imageUrl = user.imagen_usuario
    ? getFileUrl("users", user.id, user.imagen_usuario)
    : `/placeholder.svg?text=${user.nombre.charAt(0)}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <Image
              src={imageUrl}
              alt={user.nombre}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.nombre}</h1>
            <p className="text-muted-foreground">
              {user.pais}, {user.provincia}
            </p>
            <div className="flex gap-4 mt-4">
              <Button variant="outline" className="flex-1">
                Message
              </Button>
              <Button variant="outline" className="flex-1">
                Follow
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
          </TabsList>
          <TabsContent value="books" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books
                .filter((book): book is Book => book !== undefined)
                .map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="trades" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Aquí podrías mostrar los intercambios del usuario */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
