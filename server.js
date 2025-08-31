const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',        // 🔹 replace with your MySQL username
//     password: 'ribhav123', // 🔹 replace with your MySQL password
//     database: 'clinic_feedback'
// });

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  ssl: { rejectUnauthorized: true } // required by Railway MySQL
});


db.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database');
});

// Serve your HTML + JS files (since both are in root)
app.use(express.static(path.join(__dirname)));

// Route to handle feedback submission
app.post('/submit', (req, res) => {
    console.log("📩 Received feedback:", req.body);  // 👈 debug log
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ status: 'error', message: 'Name and message are required' });
    }

    const sql = 'INSERT INTO feedback (name, message) VALUES (?, ?)';
    db.query(sql, [name, message], (err, result) => {
        if (err) {
            console.error('❌ Error inserting feedback:', err);
            return res.status(500).json({ status: 'error', message: 'Database error' });
        }
        res.json({ status: 'success', message: 'Feedback saved!' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
