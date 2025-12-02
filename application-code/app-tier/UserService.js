const db = require('./DbConfig');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

// Create MySQL connection pool
const pool = mysql.createPool({
  host: db.DB_HOST,
  user: db.DB_USER,
  password: db.DB_PWD,
  database: db.DB_DATABASE,
  connectionLimit: 10,
});

// -------------------------------
// REGISTER USER
// -------------------------------
async function register(username, password) {
  const hash = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, hash],
      (err, result) => {
        if (err) {
          console.error("❌ Error inserting user:", err);
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

// -------------------------------
// LOGIN USER
// -------------------------------
async function login(username, password) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) {
          console.error("❌ Login DB error:", err);
          return reject(err);
        }

        // User not found
        if (results.length === 0) {
          return resolve(null);
        }

        const user = results[0];

        // Compare password
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
          return resolve(null);
        }

        resolve(user);
      }
    );
  });
}

module.exports = { register, login };

