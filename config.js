const admin = require('firebase-admin');
require('dotenv').config();

// Parseamos las credenciales desde el archivo .env
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// Inicializamos Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Exportamos la instancia de Firestore
const db = admin.firestore();
module.exports = db;