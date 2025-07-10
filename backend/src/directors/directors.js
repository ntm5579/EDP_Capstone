import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const directors = express.Router();



const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

directors.get('/director/:name/movies', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const { name } = req.params;

        const movies = await collection.find({ director: name }).toArray();
        res.json(movies);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});
export default directors;