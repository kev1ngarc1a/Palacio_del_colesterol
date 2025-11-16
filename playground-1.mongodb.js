/* global use, db */

// 1. Define el nombre de tu base de datos (Ejecuta esto en el Playground)
const database = 'Proyecto0DB'; 

// Usa la base de datos (la crea si no existe)
use(database);

// 2. Crea las colecciones (equivalentes a tus tablas)

db.createCollection('usuarios');
db.createCollection('productos');
db.createCollection('pedidos');
db.createCollection('empleados');


const collection = 'NEW_COLLECTION_NAME';
