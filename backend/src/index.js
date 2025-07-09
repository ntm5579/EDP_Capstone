import express from 'express'
import morgan from 'morgan'
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = 4000;

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Endpoint to read and send JSON file content
app.get('/movies', async (req, res) => {
  try {
    console.log(url);
    const client = await MongoClient.connect(url);
    console.log("here");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const movies = await collection.find({}).toArray();
    res.json(movies);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something is wrong... No movies for you! ☹");
  }
});

app.get('/movies:id', async (req, res) => { });

app.get('/director:id/movies', async (req, res) => { });

app.get('/genre:id/moives', async (req, res) => { });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});