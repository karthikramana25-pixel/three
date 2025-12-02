const userService = require('./UserService');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionService = require('./TransactionService');
const waitForMySQL = require('./wait-for-mysql');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// =======================================================
// Health Check
// =======================================================
app.get('/health', (req, res) => {
    res.json("This is the health check");
});

// =======================================================
// ADD TRANSACTION
// =======================================================
app.post('/transaction', (req, res) => {
    try {
        const success = transactionService.addTransaction(req.body.amount, req.body.desc);
        if (success === 200) {
            return res.json({ message: 'added transaction successfully' });
        } else {
            return res.json({ message: 'transaction failed' });
        }
    } catch (err) {
        return res.json({ message: 'something went wrong', error: err.message });
    }
});
// =======================================================
// USER REGISTRATION
// =======================================================
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        await userService.register(username, password);
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: "User already exists or DB error", details: err.message });
    }
});

// =======================================================
// USER LOGIN
// =======================================================
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await userService.login(username, password);

    if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    // JWT token
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || "mysecret",
        { expiresIn: "1h" }
    );

    res.json({ token });
});

// =======================================================
// GET ALL TRANSACTIONS
// =======================================================
app.get('/transaction', (req, res) => {
    try {
        transactionService.getAllTransactions(function(results) {
            const transactionList = results.map(row => ({
                id: row.id,
                amount: row.amount,
                description: row.description
            }));

            return res.status(200).json({ result: transactionList });
        });
    } catch (err) {
        res.json({ message: "could not get all transactions", error: err.message });
    }
});

// =======================================================
// DELETE ALL
// =======================================================
app.delete('/transaction', (req, res) => {
    try {
        transactionService.deleteAllTransactions(function() {
            return res.status(200).json({ message: "delete function execution finished." });
        });
    } catch (err) {
        res.json({ message: "Deleting all transactions may have failed.", error: err.message });
    }
});

// =======================================================
// DELETE BY ID
// =======================================================
app.delete('/transaction/id', (req, res) => {
    try {
        transactionService.deleteTransactionById(req.body.id, function() {
            return res.status(200).json({ message: `transaction with id ${req.body.id} seemingly deleted` });
        });
    } catch (err) {
        res.json({ message: "error deleting transaction", error: err.message });
    }
});

// =======================================================
// GET SINGLE TRANSACTION
// =======================================================
app.get('/transaction/id', (req, res) => {
    try {
        transactionService.findTransactionById(req.body.id, function(result) {
            const row = result[0];

            return res.json({
                id: row.id,
                amount: row.amount,
                desc: row.description
            });
        });
    } catch (err) {
        res.json({ message: "error retrieving transaction", error: err.message });
    }
});

// =======================================================
// START SERVER **AFTER** MYSQL IS READY
// =======================================================
(async () => {
    await waitForMySQL();
    app.listen(4000, () => {
        console.log("AB3 backend app listening...");
    });
})();

