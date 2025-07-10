import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const cart = express.Router();



const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

cart.get('/cart/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("Order");

        const { id } = req.params;

        const cart = await collection.find({ id: id }).toArray();
        res.json(cart);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});

cart.post('/cart/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("Order");

        const { cart } = req.params;

        /* example post request from other project
        const { username, password } = req.body;
            try {
                const result = await pool.query('SELECT uid FROM users WHERE username = $1 AND password = $2', [username, password]);
                if (result.rows.length > 0) {
                    res.status(200).json({ uid: result.rows[0].uid });
                } else {
                    res.status(401).json({ message: 'Authentication failed' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        */
        res.json(cart);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});
export default cart;

