import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";
import {ObjectId} from "mongodb";

export const POST = async ({request}:any) => {
    const {id} = await request.json();
    // convert _id to an ObjectId
    const o_id = new ObjectId(id);

    try {
        const database = await connectToMongo();
        const documentCollection = database.collection('plantationJourney');
        const documentFindOneResult = await documentCollection.findOne({_id: o_id});

        if (documentFindOneResult) {
            ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
            return new Response(JSON.stringify(documentFindOneResult), {status: 200})
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