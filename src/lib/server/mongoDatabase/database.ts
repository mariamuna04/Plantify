import {MongoClient} from "mongodb";
import {MONGO_URL} from "$env/static/private";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

const client = new MongoClient(MONGO_URL, {connectTimeoutMS: 5000, socketTimeoutMS: 5000});

export const connectToMongo = async () => {
    try {
        await client.connect();
        ConsolePrintOK("DATABASE LOG: Connected to MongoDB Server");
        return client.db('Plantify');
    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        throw new Error('Internal Server Error');
    }
};

export const closeMongoConnection = async () => {
    await client.close();
    ConsolePrintOK("DATABASE LOG: MongoDB Server connection closed");
};
