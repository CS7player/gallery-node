const express = require('express');
const app = express();
const cors = require('cors');
require('./app/utils/config'); // to initallize the global variable in config file from the env file
require('./app/utils/constants');
const corsOptions = {
 origin: (origin, callback) => {
  console.log(ALLOW_ORIGNS);
  console.log('origin', origin);


  if (!origin || ALLOW_ORIGNS.includes(origin)) {
   callback(null, true);
  } else {
   callback(new Error('Not allowed by CORS'));
  }
 },
};
app.use(cors(corsOptions));
app.use(express.json());
const { connection } = require('./app/utils/db');
connection(); // to check the database connecion 
const routes = require('./app/routes')
app.use(routes);
app.listen(PORT, () => {
 console.log(`the server is running on http://localhost:${PORT}`)
})