const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dhanush',
    password: 'priya0818',
    database: 'zenz12345',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET request for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'zenzone.html'));
});

// Handle GET request for Create_Account.html
app.get('/Create_Account.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Create_Account.html'));
});

// Express route for handling the form submission (POST request)
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age;

    // Insert the data into the MySQL table
    const sql = 'INSERT INTO zenztable (name, username, password, age) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, username, password, age], (err, result) => {
        if (err) {
            console.error('Error storing data in MySQL: ', err);
            res.status(500).send('Error storing data in MySQL');
            return;
        }

        console.log('Data stored successfully in MySQL');
        res.status(200).send('Data stored successfully in MySQL');
    });
});

// Express route for handling login validation (POST request)
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Replace this with actual logic to check against your database
    const sql = 'SELECT * FROM zenztable WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error validating login in MySQL: ', err);
            res.status(500).send('Error validating login in MySQL');
            return;
        }

        if (result.length > 0) {
            // Login successful
            res.status(200).send('Login successful!');
        } else {
            // Invalid username or password
            res.status(401).send('Invalid username or password.');
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
