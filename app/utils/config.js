require('dotenv').config();

global.PORT = process.env.PORT;
global.MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
global.MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
global.MONGO_DB_HOST = process.env.MONGO_DB_HOST;
global.MONGO_DB_COLLECTION = process.env.MONGO_DB_COLLECTION;
global.SECRET_KEY = process.env.SECRET_KEY;