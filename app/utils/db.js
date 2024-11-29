const mongoose = require('mongoose');

let db;
const URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_COLLECTION}`;

const connection = async () => {
 console.log('MongoDB URL:', URL); // Debugging line
 try {
  // Connect to MongoDB with Mongoose
  await mongoose.connect(URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverSelectionTimeoutMS: 5000, // Timeout in 5 seconds
  });
  console.log('Database is connected!');
  db = mongoose.connection.db; // Store the db reference
 } catch (err) {
  console.error('Error connecting to MongoDB:', err.message);
  throw err; // Propagate the error if connection fails
 }
};

const getDb = () => {
 if (db) {
  return db;
 } else {
  throw new Error('Database is not connected');
 }
};

// Export functions to connect and get the db reference
module.exports = {
 connection,
 getDb
};
