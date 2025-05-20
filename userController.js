// Importamos el modelo de usuarios para interactuar con la base de datos
const userModel = require('../models/userModel');

// Definimos los resolvers para las operaciones de GraphQL
const resolvers = {
    Query: {
        // Resolver para obtener todos los usuarios
        getUsers: () => userModel.getAll(),

        // Resolver para obtener un usuario por su ID
        getUser: (_, { id }) => userModel.getById(id),
    },
    Mutation: {
        // Resolver para crear un nuevo usuario
        createUser: (_, { name, email }) => userModel.create(name, email),

        // Resolver para actualizar un usuario existente
        updateUser: (_, { id, name, email }) => userModel.update(id, name, email),

        // Resolver para eliminar un usuario por su ID
        deleteUser: (_, { id }) => userModel.remove(id),
    },
};

// Exportamos los resolvers para que puedan ser utilizados en el servidor de GraphQL
module.exports = resolvers;