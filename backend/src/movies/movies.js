import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import axios from "axios";

dotenv.config();
const movies = express.Router();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

// Endpoint to read and send JSON file content
movies.get("/movies", async (req, res) => {
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

movies.get("/movies/:id", async (req, res) => {
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

movies.get("/movies/title=:title", async (req, res) => {
  console.log("correct request");
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

movies.get("/movies/recommendations/:id", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const { id } = req.params;

    //   Get Movie
    const movieArray = await collection
      .find({ _id: new ObjectId(id) })
      .toArray();

    const movie = movieArray[0];
    const movieTitle = movie.title;

    let resdata = [];
    // Pythion Call
    try {
      const response = await axios.post("http://localhost:5001/recommend", {
        title: movieTitle,
      });
      resdata = response.data.recommendations;
    } catch (error) {
      console.log("Error at python");
      res.status(500).send("Failed At Python Model");
    }

    const matchedMovies = await collection
      .find({ title: { $in: resdata } }).limit(5)
      .toArray();
    res.json(matchedMovies);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
  }
});

export default movies;
