import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const GET = async () => {
    try {
        const database = await connectToMongo();
        const questionsData = database.collection('questionAnswer');
        const questions = await questionsData.find().sort({name: 1}).toArray();

        if (questions) {
            ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
            return new Response(JSON.stringify(questions), {status: 200})
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