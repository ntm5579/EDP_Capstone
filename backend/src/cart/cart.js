import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const cart = express.Router();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

cart.get('/cart', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("Order");

        const carts = await collection.find({ 'ordered': false }).toArray();
        if (carts.length === 0) {
            const cart = { //probably need to do something else
                "movies": [],
                "last_update": new Date(),
                "ordered": false
            }
            res.json([]);
        }

        else {
            const cart = carts[0]; //set this to a new cart
            const movies = await db.collection("Movie").find({ '_id': { $in: cart.movies } }).toArray();
            console.log(movies);
            res.json(movies);
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hmm, something doesn\'t seem right... deleting your movie from cart');
    }
});

cart.post('/order', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("Order");
        console.log(`Ordering`);
        const carts = await collection.find({ 'ordered': false }).toArray();

        const cart = carts[0]; //set this to a new cart
        await collection.updateOne(
            { "_id": cart._id },
            {
                $set: { 'last_update': new Date(), "ordered": true },
            }
        );
        res.status(201).send(`{"_id":"${cart._id}"}`);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});

cart.post('/cart/:movie_id', async (req, res) => {

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("Order");

        const { movie_id } = req.params;
        console.log(`Adding movie with id ${movie_id}to cart:`);
        const carts = await collection.find({ 'ordered': false }).toArray();
        if (carts.length === 0) {
            const cart = {
                "movies": [new ObjectId(movie_id)],
                "last_update": new Date(),
                "ordered": false
            }
            const result = await collection.insertOne(cart);
            res.status(201).send(`{"_id":"${result.insertedId}"}`);
        }
        else {
            const cart = carts[0]; //set this to a new cart
            cart.movies.push(new ObjectId(movie_id));
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

cart.post('/cart/remove/:movie_id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("Order");

        const { movie_id } = req.params;
        console.log(`Reomving movie with id ${movie_id} from cart:`);
        const carts = await collection.find({ 'ordered': false }).toArray();

        const cart = carts[0]; //set this to a new cart
        cart.movies.pop(cart.movies.indexOf(movie_id));
        await collection.updateOne(
            { "_id": cart._id },
            {
                $set: { 'last_update': new Date(), movies: cart.movies },
            }
        );
        res.status(201).send(`{"_id":"${cart._id}"}`);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});

export default cart;