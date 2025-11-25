const dbcreds = require('./DbConfig');
const mysql = require('mysql');

// -------------------------------------------------------
// Create MySQL Connection Pool (Kubernetes-Safe)
// -------------------------------------------------------
const pool = mysql.createPool({
  host: dbcreds.DB_HOST,
  user: dbcreds.DB_USER,
  password: dbcreds.DB_PWD,
  database: dbcreds.DB_DATABASE,
  connectionLimit: 10,        // Prevent overload
  connectTimeout: 20000,
  acquireTimeout: 20000
});

// Generic query function with Promises
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        console.error("❌ MySQL Query Error:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
}

// -------------------------------------------------------
// Transaction Services
// -------------------------------------------------------

async function addTransaction(amount, desc) {
  const sql = `INSERT INTO transactions (amount, description) VALUES (?, ?)`;
  return await query(sql, [amount, desc]);
}

function getAllTransactions(callback) {
  const sql = `SELECT * FROM transactions`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

function findTransactionById(id, callback) {
  const sql = `SELECT * FROM transactions WHERE id = ?`;
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

function deleteAllTransactions(callback) {
  const sql = `DELETE FROM transactions`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

function deleteTransactionById(id, callback) {
  const sql = `DELETE FROM transactions WHERE id = ?`;
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

module.exports = {
  addTransaction,
  getAllTransactions,
  findTransactionById,
  deleteTransactionById,
  deleteAllTransactions
};

