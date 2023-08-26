import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";
import {ObjectId} from "mongodb";

export const POST = async ({request}:any) => {
    const user = await request.json();
    try {
        const database = await connectToMongo();
        const competitorCollection = database.collection('competition');
        // COnvert string to ObjectId
        const o_id = new ObjectId(user._id);

        const query = {_id: o_id};
        const success = await competitorCollection.findOne(query);

        if (success) {
            ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
            return new Response(JSON.stringify(success.competition_images), {status: 200})
        } else {
            ConsolePrintError("PlantsCollection API RESPONSE: status 401")
            return new Response(null, {status: 404})
        }

    } catch (error) {
        ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}