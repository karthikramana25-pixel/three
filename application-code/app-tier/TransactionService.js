const dbcreds = require('./DbConfig');
const mysql = require('mysql');

// ----------------------------------------
// Create connection (with retry support)
// ----------------------------------------
let con;

function connectWithRetry() {
    con = mysql.createConnection({
        host: dbcreds.DB_HOST,
        user: dbcreds.DB_USER,
        password: dbcreds.DB_PWD,
        database: dbcreds.DB_DATABASE,
        connectTimeout: 20000,
        acquireTimeout: 20000
    });

    con.connect((err) => {
        if (err) {
            console.error("❌ MySQL connection failed, retrying in 2 sec:", err.code);
            setTimeout(connectWithRetry, 2000);
        } else {
            console.log("✅ Connected to MySQL successfully");
        }
    });

    con.on('error', (err) => {
        console.error("⚠️ MySQL error:", err.code);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' ||
            err.code === 'ECONNRESET' ||
            err.code === 'EAI_AGAIN') {
            console.log("🔄 Reconnecting to MySQL...");
            connectWithRetry();
        } else {
            throw err;
        }
    });
}

connectWithRetry();

// ----------------------------------------
// Services
// ----------------------------------------

function addTransaction(amount, desc) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO transactions (amount, description) VALUES (?, ?)`;

        con.query(sql, [amount, desc], (err, result) => {
            if (err) return reject(err);
            console.log("✔ Transaction added");
            resolve(result);
        });
    });
}

function getAllTransactions(callback) {
    const sql = "SELECT * FROM transactions";

    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("✔ Retrieved all transactions");
        callback(result);
    });
}

function findTransactionById(id, callback) {
    const sql = `SELECT * FROM transactions WHERE id = ?`;

    con.query(sql, [id], (err, result) => {
        if (err) throw err;
        callback(result);
    });
}

function deleteAllTransactions(callback) {
    const sql = "DELETE FROM transactions";

    con.query(sql, (err, result) => {
        if (err) throw err;
        callback(result);
    });
}

function deleteTransactionById(id, callback) {
    const sql = `DELETE FROM transactions WHERE id = ?`;

    con.query(sql, [id], (err, result) => {
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

