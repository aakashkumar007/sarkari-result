require("dotenv").config();
const { log } = require("console");
const fs = require("fs");
const path = require("path");

const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port:process.env.PORT,
});


connection.connect((err) => {
  if (err) {
    console.error("Connection Error Details:", err);
    console.log("Host:", process.env.HOST);
    console.log("Port:", process.env.PORT);
    console.log("User:", process.env.USER);
    console.log("DATABASE:", process.env.DATABASE);
    console.log("PASSWORD:", process.env.PASSWORD);
    return;
  }
  console.log("Connected to MySQL");
});


module.exports = connection;
