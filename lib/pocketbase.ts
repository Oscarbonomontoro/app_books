import PocketBase from "pocketbase"

// Create a single PocketBase instance for the entire application
export const pb = new PocketBase("http://localhost:8090")

// Types based on the PocketBase schema
export interface User {
  id: string
  nombre: string
  telefono: string
  mail: string
  pais: string
  provincia: string
  codigo_postal: string
  imagen_usuario?: string
  created: string
  updated: string
}

export interface Book {
  id: string
  titulo: string
  categoria: string
  autor: string
  descripcion: string
  observaciones: string
  imagen_libro?: string
  created: string
  updated: string
}

export interface UserTrade {
  id: string
  user_id: string
  books_id: string
  created: string
  updated: string
  expand?: {
    user_id?: User
    books_id?: Book
  }
}

// Helper function to validate PocketBase ID
export function isValidPocketBaseId(id: string): boolean {
  // PocketBase IDs are typically 24 characters long and contain lowercase letters and numbers
  return /^[a-z0-9]{24}$/.test(id);
}

// Helper functions to interact with PocketBase
export async function getBooks() {
  try {
    return await pb.collection("books").getFullList<Book>()
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
}

export async function getBook(id: string) {
  try {
    return await pb.collection("books").getOne<Book>(id)
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error)
    return null
  }
}

export async function getBookByTitle(title: string) {
  try {
    const books = await pb.collection('books').getFullList<Book>({
      filter: `titulo = "${title}"`,
    });
    
    return books[0] || null;
  } catch (error) {
    console.error('Error fetching book by title:', error);
    return null;
  }
}

export async function getUsers() {
  try {
    return await pb.collection("users").getFullList<User>()
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export async function getUser(id: string) {
  try {
    return await pb.collection("users").getOne<User>(id)
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error)
    return null
  }
}

export async function getUserByName(name: string) {
  try {
    const records = await pb.collection("users").getList<User>(1, 1, {
      filter: `nombre = "${name}"`,
    })
    return records.items.length > 0 ? records.items[0] : null
  } catch (error) {
    console.error(`Error fetching user with name ${name}:`, error)
    return null
  }
}

export async function getUserTrades() {
  try {
    return await pb.collection("user_trade").getFullList<UserTrade>({
      expand: "user_id,books_id",
    })
  } catch (error) {
    console.error("Error fetching user trades:", error)
    return []
  }
}

export async function getUserTradesByUserId(userId: string) {
  try {
    return await pb.collection("user_trade").getList<UserTrade>(1, 50, {
      filter: `user_id = "${userId}"`,
      expand: "books_id",
    })
  } catch (error) {
    console.error(`Error fetching trades for user ${userId}:`, error)
    return { items: [] }
  }
}

export async function getUserTradesByBookId(bookId: string) {
  try {
    return await pb.collection("user_trade").getList<UserTrade>(1, 50, {
      filter: `books_id = "${bookId}"`,
      expand: "user_id",
    })
  } catch (error) {
    console.error(`Error fetching trades for book ${bookId}:`, error)
    return { items: [] }
  }
}

export async function createUser(userData: Partial<User>) {
  try {
    return await pb.collection("users").create<User>(userData)
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function createBook(bookData: Partial<Book>) {
  try {
    return await pb.collection("books").create<Book>(bookData)
  } catch (error) {
    console.error("Error creating book:", error)
    throw error
  }
}

export async function createUserTrade(userId: string, bookId: string) {
  try {
    return await pb.collection("user_trade").create<UserTrade>({
      user_id: userId,
      books_id: bookId,
    })
  } catch (error) {
    console.error("Error creating user trade:", error)
    throw error
  }
}

export async function login(email: string, password: string) {
  try {
    return await pb.collection("users").authWithPassword(email, password)
  } catch (error) {
    console.error("Error logging in:", error)
    throw error
  }
}

export function logout() {
  pb.authStore.clear()
}

export function getFileURL(collectionId: string, recordId: string, fileName: string) {
  // Log para verificar los parámetros recibidos
  console.log(`Fetching URL for: ${collectionId}, ${recordId}, ${fileName}`);
  
  // Obtener la URL del archivo
  const url = pb.files.getURL({ id: recordId, collectionId }, fileName);
  
  // Log para verificar la URL generada
  //console.log(`Generated URL: ${url}`);
  
  return url;
}
