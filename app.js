const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('./app/utils/config'); // to initallize the global variable in config file from the env file
require('./app/utils/constants');
const {connection} = require('./app/utils/db');
connection(); // to check the database connecion 
const routes = require('./app/routes')
app.use(routes);
app.listen(PORT,()=>{
 console.log(`the server is running on http://localhost:${PORT}`)
})