
from flask import Flask, request, jsonify
from flask_cors import CORS 
import pandas as pd
from sklearn.neighbors import NearestNeighbors

app = Flask(__name__)
CORS(app)
# Load and preprocess data
df = pd.read_json("./movies.json")
df['price'] = df['price'].astype(float)
df['average_rating'] = df['average_rating'].astype(float)
df['original_index'] = df.index
df_exploded = df.explode('genre')
genre_dummies = pd.get_dummies(df_exploded['genre'])
features = pd.concat([df_exploded[['original_index', 'price', 'average_rating']], genre_dummies], axis=1)
df_encoded = features.groupby('original_index').sum()

# Train the model
model = NearestNeighbors(n_neighbors=6, algorithm='auto')
model.fit(df_encoded)

@app.route("/")
def home():
    return "Recommender API is running"

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    input_title = data.get("title", "")
    match_index = df[df['title'].str.lower() == input_title.lower()].index

    if len(match_index) == 0:
        return jsonify({ "recommendations": [] })

    idx = match_index[0]
    _, indices = model.kneighbors(df_encoded.iloc[[idx]])
    recommended_titles = [df.iloc[i]['title'] for i in indices[0]]

    return jsonify({ "recommendations": recommended_titles })

if __name__ == "__main__":
    app.run(port=5001)
