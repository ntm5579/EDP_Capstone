import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const movies = express.Router();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

// Endpoint to read and send JSON file content
movies.get('/movies', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const movies = await collection.find({}).toArray();
        res.json(movies);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});

movies.get('/movies/:id', async (req, res) => {
    console.log("wrong");
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const { id } = req.params;

        const movie = await collection.find({ _id: new ObjectId(id) }).toArray();
        res.json(movie);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});

movies.get('/movies/title=:title', async (req, res) => {
    console.log('correct request');
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const { title } = req.params;
        console.log(title);

        const movie = await collection.find({ title: title }).toArray();
        res.json(movie);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
    }
});

export default movies;