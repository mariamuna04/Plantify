import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";
import {ObjectId} from "mongodb";

export const POST = async ({request}: any) => {
    const {review, email, plant_id} = await request.json();
    const o_id = new ObjectId(plant_id);
    try {
        const database = await connectToMongo();
        const flowersCollection = database.collection('plants');
        const updateQuery = {
            $push:
                {
                    review: {
                        email: email,
                        review: review,
                    }
                }
        };

        const flowerExists = await flowersCollection.updateOne({_id: o_id}, updateQuery, {upsert: false});

        if (flowerExists) {
            ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
            return new Response(JSON.stringify({}), {status: 200})
        } else {
            ConsolePrintError("PlantsCollection API RESPONSE: status 401")
            return new Response(JSON.stringify({}), {status: 401})
        }
    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}