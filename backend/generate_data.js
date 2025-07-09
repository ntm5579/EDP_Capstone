import { MongoClient, ObjectId } from 'mongodb';

const movie_template = { //how to structure a movie for the db
    "_id": {
        "$oid": ""
    },
    "title": "",
    "director": "",
    "release_date": "Date object",
    "genre": [],
    "average_rating": 0.0,
    "description": "",
    "price": 0.0,
    "img_link": "",
    "trailer_link": ""

}

const user_template = {
    "_id": {
        "$oid": ""
    },
    "user_id": "",
    "password": ""
}

const cart_template = {
    "_id": {
        "$oid": ""
    },
    "user_id": "",
    "credit_card": "",
    "address": "",
    "items": ["movie ids"],
    "ordered": False
}

try {
    // TODO: Make a POST request to the API to add the sock
    const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    // Handle post submission logic (like showing a success message)
} catch (error) {
    console.error("Error posting data", error);
    // Handle errors here
}