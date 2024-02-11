const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'dhanush',
    password: 'priya0818',
    database: 'zenzone'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Register a new user (POST request)
app.post('/register', async (req, res) => {
    try {
        const fullName = req.body.fullName;
        const username = req.body.username;
        const password = await bcrypt.hash(req.body.password, 10); // Hash the password
        const age = req.body.age;

        const sql = 'INSERT INTO zen1 (full_name, username, password, age) VALUES (?, ?, ?, ?)';
        const values = [fullName, username, password, age];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing MySQL query: ', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('User registered successfully');
            res.status(200).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error processing registration request: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user details by ID (GET request)
app.get('/zenzone.html', (req, res) => {
    const userId = req.params.id;

    // Perform a database query or other logic based on the user ID
    // For simplicity, let's just return a message with the user ID
    res.status(200).json({ userId, message: 'User details fetched successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
