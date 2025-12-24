const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const PORT = 3000;

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('cbe');
        console.log('Connected to MongoDB database.');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function auth(req, res, next) {
    const token = req.header.authorization;
    console.log("Auth Token:", token);
    if (!token)
         return res.status(401).json({ message: '"Token missing"' });
}
const actualToken = token.split(' ')[1];