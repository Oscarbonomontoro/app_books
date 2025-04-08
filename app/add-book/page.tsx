"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { createUserTrade, pb } from "@/lib/pocketbase"

export default function AddBookPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [bookImage, setBookImage] = useState<File | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const [bookData, setBookData] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    descripcion: "",
    observaciones: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setBookData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBookImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pb.authStore.isValid) {
      toast({
        title: "Authentication required",
        description: "Please log in to add a book.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      // Create form data for the book with image
      const formData = new FormData()

      // Add all book data
      Object.entries(bookData).forEach(([key, value]) => {
        formData.append(key, value)
      })

      // Add image if selected
      if (bookImage) {
        formData.append("imagen_libro", bookImage)
      }

      // Create the book
      const createdBook = await pb.collection("books").create(formData)

      // Create user_trade record to associate the book with the current user
      await createUserTrade(pb.authStore.model?.id, createdBook.id)

      toast({
        title: "Book added successfully",
        description: "Your book has been added to your collection.",
      })

      router.push(`/books/${createdBook.id}`)
      router.refresh()
    } catch (error) {
      console.error("Error adding book:", error)
      toast({
        title: "Failed to add book",
        description: "There was an error adding your book. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add a New Book</CardTitle>
          <CardDescription>Share a book from your collection with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titulo">Book Title</Label>
              <Input id="titulo" value={bookData.titulo} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="autor">Author</Label>
              <Input id="autor" value={bookData.autor} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Category</Label>
              <Input id="categoria" value={bookData.categoria} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Description</Label>
              <Textarea id="descripcion" value={bookData.descripcion} onChange={handleChange} rows={4} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observaciones">Notes (Optional)</Label>
              <Textarea id="observaciones" value={bookData.observaciones} onChange={handleChange} rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imagen_libro">Book Cover Image (Optional)</Label>
              <Input id="imagen_libro" type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding Book..." : "Add Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

