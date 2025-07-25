import express from 'express'
import morgan from 'morgan'
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors'
import movies from "./movies/movies.js";
import directors from "./directors/directors.js";
import genres from "./genres/genres.js";
import cart from "./cart/cart.js";


dotenv.config();


const app = express();
const PORT = 4000;

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use("/api", movies)
app.use("/api", genres)
app.use("/api", directors)
app.use("/api", cart)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});