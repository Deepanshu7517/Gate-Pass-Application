// server.js
// 1. Load Environment Variables
require('dotenv').config();

const sql = require('mssql');
const express = require('express');
const cors = require('cors'); // ✅ Add this
const app = express();

// ✅ Add CORS middleware BEFORE your routes
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
}));

// ✅ Add JSON body parser (you'll need this for POST requests later)
app.use(express.json());

// 2. Define the Database Configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// 3. Create and Maintain the Connection Pool
const pool = new sql.ConnectionPool(dbConfig);
let isConnected = false;

const connectDb = async () => {
    try {
        await pool.connect();
        isConnected = true;
        console.log("Database connected successfully! (MS SQL Server)");
    } catch (err) {
        isConnected = false;
        console.error("Database Connection Failed! Error:", err.message);
        process.exit(1);
    }
};

// ✅ Get all visitors
app.get('/api/visitors', async (req, res) => {
    try {
        const result = await pool.request().query('SELECT * FROM Visitors');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching visitors:', err.message);
        res.status(500).json({ error: 'Failed to fetch visitors', details: err.message });
    }
});

// 4. Example Usage in an API Endpoint
app.get('/api/status', async (req, res) => {
    if (!isConnected) {
        return res.status(500).json({ status: "Database Disconnected" });
    }
    
    try {
        const result = await pool.request().query('SELECT GETDATE() AS CurrentDateTime');
        res.status(200).json({
            status: "OK",
            dbTime: result.recordset[0].CurrentDateTime
        });
    } catch (err) {
        res.status(500).json({ error: "Query failed", details: err.message });
    }
});

// 5. Initialize the Database and Start the Server
const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// Important: Handle graceful shutdown
process.on('SIGINT', () => {
    if (pool) {
        pool.close();
        console.log('Database connection pool closed.');
    }
    process.exit();
});