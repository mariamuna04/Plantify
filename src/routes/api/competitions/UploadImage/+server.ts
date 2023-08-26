import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const POST = async ({request}:any) => {
    const data = await request.json();
    try {
        const database = await connectToMongo();
        const documentCollection = database.collection('competition');
        const query = {email: data.email};
        const updateQuery = {
            $inc: {trees_planted: 1},
            $push:
                {competition_images: {
                        data: data.image,
                        description: data.description,
                        date: new Date().toISOString()
                }}
        };
        const success = await documentCollection.updateOne(query, updateQuery, {upsert: false});

        if (success) {
            ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
            return new Response(null, {status: 200})
        } else {
            ConsolePrintError("PlantsCollection API RESPONSE: status 401")
            return new Response(null, {status: 401})
        }
    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}