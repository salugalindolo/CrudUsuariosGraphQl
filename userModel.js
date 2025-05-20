// Importamos la conexión a Firestore desde el archivo de configuración
const db = require('../config');

// Referencia a la colección "users" en Firestore
const usersCollection = db.collection('users');

// Valida el formato del correo electrónico utilizando una expresión regular
// Retorna `true` si el correo es válido, de lo contrario `false`
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Obtiene todos los usuarios de la colección "users"
// Retorna un arreglo de objetos con los datos de cada usuario
const getAll = async () => {
  const snapshot = await usersCollection.get(); // Obtiene todos los documentos de la colección
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapea los documentos a un arreglo de objetos
};

// Obtiene un usuario por su ID
// Lanza un error si el usuario no existe
// Retorna un objeto con los datos del usuario
const getById = async (id) => {
  const userDoc = usersCollection.doc(id); // Referencia al documento con el ID especificado
  const snapshot = await userDoc.get(); // Obtiene el documento
  if (!snapshot.exists) throw new Error(`El usuario ${id} no existe`); // Verifica si el documento existe
  return { id: snapshot.id, ...snapshot.data() }; // Retorna los datos del usuario
};

// Crea un nuevo usuario en la colección "users"
// Valida el formato del correo electrónico antes de crear el usuario
// Retorna un objeto con los datos del usuario creado, incluyendo su ID generado automáticamente
const create = async (name, email) => {
  if (!isValidEmail(email)) throw new Error('El formato del correo electrónico no es válido'); // Valida el correo
  const newUser = { name, email }; // Datos del nuevo usuario
  const docRef = await usersCollection.add(newUser); // Agrega el usuario a la colección
  return { id: docRef.id, ...newUser }; // Retorna los datos del usuario creado
};

// Actualiza un usuario existente en la colección "users"
// Lanza un error si el usuario no existe o si el correo tiene un formato inválido
// Retorna un objeto con los datos actualizados del usuario
const update = async (id, name, email) => {
  const userDoc = usersCollection.doc(id); // Referencia al documento con el ID especificado
  const snapshot = await userDoc.get(); // Obtiene el documento
  if (!snapshot.exists) throw new Error(`El usuario ${id} no existe`); // Verifica si el documento existe

  const updatedData = {}; // Objeto para almacenar los datos a actualizar
  if (name) updatedData.name = name; // Actualiza el nombre si se proporciona
  if (email) {
    if (!isValidEmail(email)) throw new Error('El formato del correo electrónico no es válido'); // Valida el correo
    updatedData.email = email; // Actualiza el correo si es válido
  }

  await userDoc.update(updatedData); // Actualiza el documento en Firestore
  return { id, ...updatedData }; // Retorna los datos actualizados
};

// Elimina un usuario por su ID de la colección "users"
// Lanza un error si el usuario no existe
// Retorna un objeto con los datos del usuario eliminado
const remove = async (id) => {
  const userDoc = usersCollection.doc(id); // Referencia al documento con el ID especificado
  const snapshot = await userDoc.get(); // Obtiene el documento
  if (!snapshot.exists) throw new Error(`El usuario ${id} no existe`); // Verifica si el documento existe

  await userDoc.delete(); // Elimina el documento de Firestore
  return { id, ...snapshot.data() }; // Retorna los datos del usuario eliminado
};

// Exportamos las funciones para que puedan ser utilizadas en otros archivos
module.exports = { getAll, getById, create, update, remove };