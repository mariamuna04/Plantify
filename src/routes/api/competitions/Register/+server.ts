import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const POST = async ({request}:any) => {
    const competitor = await request.json();
    try {
        const database = await connectToMongo();
        const competitorCollection = database.collection('competition');
        const query = {
            name: competitor.name,
            email: competitor.email,
            likes: 0,
            joined: new Date().toISOString(),
            age: competitor.age,
            location: competitor.location,
            trees_planted: 0
        };
        const success = await competitorCollection.insertOne(query);

        if (success) {
            ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
            return new Response(null, {status: 200})
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
