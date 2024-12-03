const mysql = require("mysql2");

// Create a connection pool
// Localhost
const pool = mysql.createPool({
  host: "20.2.201.112",
  user: "nghianl",
  password: "nghianl",
  database: "english_center",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
