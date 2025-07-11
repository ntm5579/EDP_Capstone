from pymongo import MongoClient
from datetime import datetime
from faker import Faker
import random

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")
db = client['movieStore']
movies_col = db['movies']

# Drop old data to prevent mixing with new
movies_col.drop()

# Setup
fake = Faker()
genres = ["Action", "Comedy", "Drama", "Sci-Fi", "Romance", "Thriller", "Adventure", "Fantasy"]

# Real movie-related poster links
poster_links = [
    "https://miro.medium.com/v2/resize:fit:1400/0*J3gdqfAV-zosfI2Q.jpg",
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/09/23/10/06%20-%20Back%20to%20the%20Future.jpg?width=1200",
    "https://designyoutrust.com/wp-content/uploads/2017/05/35-3-990x1504.jpg",
    "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3BkbWlzY3Byb2plY3QyMC13azEwMjc1MzI5Ni1pbWFnZS5qcGc.jpg",
    "https://i.pinimg.com/736x/af/dd/53/afdd538598ee07e051c62e4b6e16f0aa.jpg",
    "https://designyoutrust.com/wp-content/uploads/2017/05/7-16-990x1499.jpg",
    "https://imjustcreative.com/wp-content/uploads/2016/09/Enemy-Movie-Film-Poster-without-Film-Titles-Wording.jpg",
    "https://www.fubiz.net/wp-content/uploads/2015/03/I-Am-Legend.jpg",
    "https://img.buzzfeed.com/buzzfeed-static/static/2019-09/18/16/enhanced/37ffe160936f/enhanced-1261-1568824359-1.jpg?output-format=jpg&output-quality=auto",
    "https://imjustcreative.com/wp-content/uploads/2016/09/Dirty-Harry-Movie-Film-Poster-without-Film-Titles-Wording.jpg"
]

# YouTube trailer IDs
trailer_ids = [
    "6stlCkUDG_s",
    "gsnqXt7d1mU",
    "eg2g6FPsdLI",
    "4N8oOj_aue8",
    "oe70Uhjc_F4",
    "HccqokXN2n8",
    "HHBsvKnCkwI",
    "NpdQkEPELh4",
    "ZjbFDYoE-OY",
    "SDzl9uB7j0s"
]

# Generate movies
movies = []
while len(movies) < 1000:
    director = fake.name()
    for _ in range(random.choice([2, 3])):
        if len(movies) >= 1000:
            break
        movies.append({
            "title": fake.sentence(nb_words=3).rstrip('.'),
            "director": director,
            "release_date": fake.date_time_between(start_date='-30y', end_date='now'),
            "genre": random.sample(genres, k=random.randint(1, 3)),
            "average_rating": round(random.uniform(6.0, 9.5), 1),
            "description": fake.text(max_nb_chars=200),
            "price": round(random.uniform(4.99, 19.99), 2),
            "img_link": random.choice(poster_links),
            "trailer_link": f"https://youtube.com/watch?v={random.choice(trailer_ids)}"
        })

# Insert into MongoDB
movies_col.insert_many(movies)
print(" Inserted 1000 movies successfully.")
