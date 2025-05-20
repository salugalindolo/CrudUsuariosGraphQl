// Importación del servidor Apollo para configurar el servidor GraphQL
const {ApolloServer} = require('apollo-server');

// Importación de los esquemas GraphQL
const typeDefs = require('./schemas/typeDefs');

// Importación de los resolvers para manejar las operaciones GraphQL
const resolvers = require('./controllers/userController');

// Creación de una instancia del servidor Apollo con los esquemas y resolvers
const server = new ApolloServer({typeDefs, resolvers});

// Inicio del servidor y escucha en un puerto disponible
server.listen().then(({url}) => {
  // Mensaje en consola indicando que el servidor está corriendo
  console.log(`Servidor corriendo en ${url}`);
});