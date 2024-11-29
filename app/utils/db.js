const mongoose = require('mongoose');

let db;
const URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_COLLECTION}`;

const connection = async () => {
 console.log('MongoDB URL:', URL); 
 try {
  await mongoose.connect(URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverSelectionTimeoutMS: 5000, // Timeout in 5 seconds
  });
  console.log('Database is connected!');
  db = mongoose.connection.db; 
 } catch (err) {
  console.error('Error connecting to MongoDB:', err.message);
  throw err; 
 }
};

const getDb = () => {
 if (db) {
  return db;
 } else {
  throw new Error('Database is not connected');
 }
};

module.exports = {
 connection,
 getDb
};
