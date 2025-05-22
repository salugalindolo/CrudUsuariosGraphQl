const db = require('../config');
const usersCollection = db.collection('users');
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getAll = async () => {
  const snapshot = await usersCollection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
};


const getById = async (id) => {
  const userDoc = usersCollection.doc(id); 
  const snapshot = await userDoc.get(); 
  if (!snapshot.exists) throw new Error(`El usuario ${id} no existe`); 
  return { id: snapshot.id, ...snapshot.data() }; 
};


const create = async (name, email) => {
  if (!isValidEmail(email)) throw new Error('El formato del correo electrónico no es válido'); 
  const newUser = { name, email }; 
  const docRef = await usersCollection.add(newUser); 
  return { id: docRef.id, ...newUser }; 
};


const update = async (id, name, email) => {
  const userDoc = usersCollection.doc(id);
  const snapshot = await userDoc.get();
  if (!snapshot.exists) throw new Error(`El usuario ${id} no existe`);

  const updatedData = {};
  if (name) updatedData.name = name;
  if (email) {
    if (!isValidEmail(email)) throw new Error('El formato del correo electrónico no es válido');
    updatedData.email = email;
  }

  await userDoc.update(updatedData);
  return { id, ...updatedData }; 
};


const remove = async (id) => {
  const userDoc = usersCollection.doc(id); 
  const snapshot = await userDoc.get();
  if (!snapshot.exists) throw new Error(`El usuario ${id} no existe`);

  await userDoc.delete(); 
  return { id, ...snapshot.data() };
};
module.exports = { getAll, getById, create, update, remove };
