// Import dotenv at the very top to load environment variables
require('dotenv').config();

// Now, import mysql2 after the environment variables are loaded
const mysql = require('mysql2');


// Create MySQL connection using environment variables
const connection = mysql.createConnection({
  host: process.env.HOST, // This should be updated to your online database host once deployed
  user: process.env.USER, // Your MySQL username from .env
  password:process.env.PASSWORD, // Your MySQL password from .env
  database: process.env.DATABASE // Your MySQL database from .env
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Export the connection for use in other parts of your app
module.exports = connection;
