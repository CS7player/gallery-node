const mongoose = require('mongoose');

let db;
const URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_COLLECTION}`

const connection = async () => {
console.log(URL);
 await mongoose.connect(URL)
  .then((client) => {
   console.log('Database is connected!');
   db = client.connection.db;
  })
  .catch(err => {
   console.log('Error connecting to MongoDB', err);
   throw err;
  });
}

const getDb = async () => {
 if (db) {
  return db;
 }
 else {
  await connection();
  if (db) {
   return db;
  }
  throw new Error('mongodb connection failed!!!');
 }
}

exports.connection = connection;
exports.getDb = getDb;