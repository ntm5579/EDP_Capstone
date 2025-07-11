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

cart.post('/cart/:movie_id', async (req, res) => {
    /*
    cart object {
        _id:ObjectId
        id: int
        movies: [movie_ids]
        last_update: date
        ordered: boolean
    }
    */
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("Order");

        const { movie_id } = req.params;
        console.log(`Adding movie with id ${movie_id}to cart:`);
        const carts = await collection.find({ 'ordered': false }).toArray();
        if (carts.length === 0) {
            cart = {
                "id": "test",
                "movies": movie_id,
                "last_update": new Date(),
                "ordered": false
            }
            //insert database
        }
        else if (carts.length === 1) {
            const cart = carts;
            //insert movie_id to movies array
            //update the last_update time
        }
        else {
            //insert into cart movie array
            //update the last_update time
        }


        const result = await collection.insertOne(movie_id);
        console.log(resulut.insertedId);
        res.status(201).send(`{"movie_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});
export default cart;