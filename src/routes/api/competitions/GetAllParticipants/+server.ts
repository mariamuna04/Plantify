import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const GET = async () => {
    try {
        const database = await connectToMongo();
        const competitionCollection = database.collection('competition');
        // sort by name
        const competitors = await competitionCollection.find().sort({likes: -1}).toArray();

        if (competitors) {
            ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
            return new Response(JSON.stringify(competitors), {status: 200})
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
};
