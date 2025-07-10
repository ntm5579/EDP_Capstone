import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const cart = express.Router();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

/*
cart.get('/cart/:id', async (req, res) => {
    try {
        const collection = db.collection(collectionName);

        const { name } = req.params;

        const movies = await collection.find({ director: name }).toArray();
        res.json(movies);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
}
);
*/

cart.get('/cart/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("Order");

        const { id } = req.params;
        const movie_id = id;
        console.log(`Adding movie with id ${movie_id}to cart:`);
        const result = await collection.insertOne(movie_id);
        res.status(201).send(`{"movie_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});
export default cart;

/*
app.post('/socks', async (req, res) => {
    try {
        const sock  = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(sock);
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
    }
});

*/

