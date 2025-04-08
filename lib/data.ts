export const booksData = {
  users: [
    {
      nombre: "Juan Pérez",
      telefono: " 34123456789",
      mail: "juan.perez@example.com",
      password: "hashed_password_1",
      pais: "España",
      provincia: "Madrid",
      codigo_postal: "28001",
      imagen_usuario: "imagen_juan.png",
    },
    {
      nombre: "María López",
      telefono: " 34987654321",
      mail: "maria.lopez@example.com",
      password: "hashed_password_2",
      pais: "España",
      provincia: "Barcelona",
      codigo_postal: "08001",
      imagen_usuario: "imagen_maria.png",
    },
  ],
  books: [
    {
      titulo: "Cien años de soledad",
      categoria: "Novela",
      autor: "Gabriel García Márquez",
      descripcion: "Una obra maestra de la literatura latinoamericana.",
      observaciones: "Edición especial con prólogo del autor.",
      imagen_libro: "cien_anos_de_soledad.png",
    },
    {
      titulo: "Don Quijote de la Mancha",
      categoria: "Clásico",
      autor: "Miguel de Cervantes",
      descripcion: "La historia del ingenioso hidalgo Don Quijote.",
      observaciones: "Incluye ilustraciones originales.",
      imagen_libro: "don_quijote.png",
    },
  ],
  user_trades: [
    {
      user_id: 1,
      book_id: 1,
    },
    {
      user_id: 2,
      book_id: 2,
    },
  ],
}

