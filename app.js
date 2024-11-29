// const express = require('express');
// const app = express();
// const cors = require('cors');
// require('./app/utils/config'); // to initallize the global variable in config file from the env file
// require('./app/utils/constants');
// const allow_origns = ALLOW_ORIGNS.split(',') || ['*']
// const corsOptions = {
//  origin: (origin, callback) => {
//   console.log(allow_origns);
//   console.log('origin', origin);
//   if (!origin || allow_origns.includes(origin)) {
//    callback(null, true);
//   } else {
//    callback(new Error('Not allowed by CORS'));
//   }
//  },
// };
// app.use(cors(corsOptions));
// app.use(express.json());
// const { connection } = require('./app/utils/db');
// connection(); // to check the database connecion 
// const routes = require('./app/routes')
// app.use(routes);
// app.listen(PORT, () => {
//  console.log(`the server is running on http://localhost:${PORT}`)
// })

const express = require('express');
const cors = require('cors');
require('./app/utils/config'); // Initialize global variables from env file
require('./app/utils/constants'); // Assuming constants are initialized here
const { connection } = require('./app/utils/db'); // Import the connection logic

const app = express();
const allow_origns = ALLOW_ORIGNS.split(',') || ['*'];

const corsOptions = {
 origin: (origin, callback) => {
  console.log('CORS allowed origins:', allow_origns);
  console.log('Origin:', origin);
  if (!origin || allow_origns.includes(origin)) {
   callback(null, true);
  } else {
   callback(new Error('Not allowed by CORS'));
  }
 },
};
app.use(cors(corsOptions));
app.use(express.json());

// Initialize database connection and start the server once connected
const startServer = async () => {
 try {
  // Wait for DB connection before starting the server
  await connection();
  const routes = require('./app/routes'); // Import routes after DB is connected
  app.use(routes);

  // Start Express server
  app.listen(PORT, () => {
   console.log(`The server is running on http://localhost:${PORT}`);
  });
 } catch (err) {
  console.error('Failed to start server due to DB connection error:', err.message);
  process.exit(1); // Exit the process if DB connection fails
 }
};

// Start the server
startServer();

// Global unhandled rejection handler for promises
process.on('unhandledRejection', (reason, promise) => {
 console.error('Unhandled Rejection at:', promise, 'reason:', reason);
 // Optionally, exit the process
 process.exit(1);
});
