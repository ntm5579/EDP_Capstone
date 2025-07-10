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

cart.put('/cart/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("Order");

        const { cart } = req.body;
        console.log(cart);

        /* example post request from other project
        try {
            const { id } = req.params;
            const { email } = req.body;
            console.log('Updating email for user with ID:', id);
            res.status(200).send({
                status: 'success',
                data: email, // This URL should point to the newly created user
                message: 'User updated successfully.'
            });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
        }
        */
        res.json(cart);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});
export default cart;

