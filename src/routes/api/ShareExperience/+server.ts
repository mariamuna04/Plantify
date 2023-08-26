import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK, ConsolePrintWarn} from "$lib/server/ConsolePrint";

export const POST = async ({request}: any) => {
    const experience: Experience = await request.json();

    try {
        const database = await connectToMongo();
        const experienceCollection = database.collection('shareExperience');

        const query = {
            name: experience.name,
            email: experience.email,
            body: experience.body,
            likes: 0
        };

        const success = await experienceCollection.insertOne(query);

        if (success) {
            ConsolePrintOK("SignUpAuthentication API RESPONSE: status 200")
            return new Response(JSON.stringify({}), {status: 200})
        } else {
            ConsolePrintWarn("SignUpAuthentication API RESPONSE: status 401")
            return new Response(JSON.stringify(null), {status: 401})
        }
    } catch (error) {
        ConsolePrintError(`DATABASE LOG: Error connecting to MongoDB: ${error}`);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}


export const GET = async () => {

    try {
        const database = await connectToMongo();
        const experienceCollection = database.collection('shareExperience');
        //fetch all the documents from shareExperience collection
        const success = await experienceCollection.find().toArray();

        if (success) {
            ConsolePrintOK("SignUpAuthentication API RESPONSE: status 200")
            console.log(success)
            return new Response(JSON.stringify(success), {status: 200})
        } else {
            ConsolePrintWarn("SignUpAuthentication API RESPONSE: status 401")
            return new Response(JSON.stringify(null), {status: 401})
        }
    } catch (error) {
        ConsolePrintError(`DATABASE LOG: Error connecting to MongoDB: ${error}`);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}
