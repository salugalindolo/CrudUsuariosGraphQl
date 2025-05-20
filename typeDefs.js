// Importación del módulo gql de apollo-server-express para definir esquemas GraphQL
const { gql } = require('apollo-server-express');

// Definición del esquema GraphQL
const typeDefs = gql`
  # Definición del tipo User con sus campos
  type User {
    id: ID!         # Identificador único del usuario
    name: String!   # Nombre del usuario (obligatorio)
    email: String!  # Correo electrónico del usuario (obligatorio)
  }

  # Definición de las consultas disponibles
  type Query {
    # Obtiene una lista de todos los usuarios
    getUsers: [User]

    # Obtiene un usuario específico por su ID
    getUser(id: ID!): User
  }

  # Definición de las mutaciones disponibles
  type Mutation {
    # Crea un nuevo usuario con nombre y correo electrónico
    createUser(name: String!, email: String!): User

    # Actualiza un usuario existente por su ID, permitiendo modificar nombre y/o correo electrónico
    updateUser(id: ID!, name: String, email: String): User

    # Elimina un usuario existente por su ID
    deleteUser(id: ID!): User
  }
`;

// Exportación del esquema para ser utilizado en otros módulos
module.exports = typeDefs;
