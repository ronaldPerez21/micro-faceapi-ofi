const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

var permisos = require("./permisos.json");

initializeApp({
  credential: cert(permisos)
});

const db = getFirestore();

module.exports = { db };