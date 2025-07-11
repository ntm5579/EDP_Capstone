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
            const cart = {
                "movies": [movie_id],
                "last_update": new Date(),
                "ordered": false
            }
            const result = await collection.insertOne(cart);
            res.status(201).send(`{"_id":"${result.insertedId}"}`);
            //insert database
        }
        else {
            const cart = carts[0]; //set this to a new cart
            cart.movies.push(movie_id);
            await collection.updateOne(
                { "_id": cart._id },
                {
                    $set: { 'last_update': new Date(), movies: cart.movies },
                }
            );
            res.status(201).send(`{"_id":"${cart._id}"}`);
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});
export default cart;