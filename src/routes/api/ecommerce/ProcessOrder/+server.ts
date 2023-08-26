import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const POST = async ({request}:any) => {
    // const cart = await request.json();
    // try {
    //     const database = await connectToMongo();
    //     const flowersCollection = database.collection('plants');
    //     const query = {name: cart.name};
    //     const flowerExists = await flowersCollection.findOne(query);
    //
    //     if (flowerExists) {
    //         ConsolePrintOK("PlantsCollection API RESPONSE: status 200")
    //         return new Response(JSON.stringify(flowerExists), {status: 200})
    //     } else {
    //         ConsolePrintError("PlantsCollection API RESPONSE: status 401")
    //         return new Response(JSON.stringify({}), {status: 401})
    //     }
    // } catch (error) {
    //     ConsolePrintError("DATABASE LOG: Error connecting to MongoDB: " + error);
    //     return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    // } finally {
    //     await closeMongoConnection();
    // }
}