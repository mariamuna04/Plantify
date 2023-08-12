import {MongoClient} from "mongodb";
import {MONGO_URL} from "$env/static/private";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

// Create a new MongoClient
const client: MongoClient = new MongoClient(MONGO_URL, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
});

// Use connect method to connect to the Server
export const connectToMongo = async () => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        ConsolePrintOK("DATABASE LOG: Connected to MongoDB Server");
        // Return the database object
        return client.db('Plantify');
    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        throw new Error('Internal Server Error');
    }
};

// Close the connection
export const closeMongoConnection = async () => {
    // Close the client
    await client.close();
    ConsolePrintOK("DATABASE LOG: MongoDB Server connection closed");
};
