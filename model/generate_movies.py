from pymongo import MongoClient
from datetime import datetime
from faker import Faker
import random

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")
db = client['movieStore']
movies_col = db['movies']

# Initialize Faker
fake = Faker()

# Genre pool 
genres = ["Action", "Comedy", "Drama", "Sci-Fi", "Romance", "Thriller", "Adventure", "Fantasy"]

# Generate 1000+ dummy movies
dummy_movies = []

for _ in range(1000):
    movie = {
    "title": fake.sentence(nb_words=3).rstrip('.'),
    "director": fake.name(),
    "release_date": datetime.combine(
        fake.date_between(start_date='-30y', end_date='today'),
        datetime.min.time()
    ),
    "genre": random.sample(genres, k=random.randint(1, 3)),
    "average_rating": round(random.uniform(6.0, 9.5), 1),
    "description": fake.text(max_nb_chars=200),
    "price": round(random.uniform(4.99, 19.99), 2),
    "img_link": fake.image_url(),
    "trailer_link": f"https://youtube.com/watch?v={fake.uuid4()}"
}
    dummy_movies.append(movie)

# Insert all into MongoDB
movies_col.insert_many(dummy_movies)

print("Successfully inserted 1000+ movies into MongoDB!")
