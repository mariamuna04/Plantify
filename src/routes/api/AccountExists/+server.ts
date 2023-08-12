import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK, ConsolePrintWarn} from "$lib/server/ConsolePrint";

export const POST = async ({request}: any) => {
    const data = await request.json();
    const email = data.email;

    try {
        const database = await connectToMongo();
        const usersCollection = database.collection('users');
        const query = {email: email};

        const success = await usersCollection.findOne(query);

        if (success) {
            ConsolePrintOK("SignUpAuthentication API RESPONSE: status 200")
            return new Response(null, {status: 200})
        } else {
            ConsolePrintWarn("SignUpAuthentication API RESPONSE: status 404")
            return new Response(null, {status: 401})
        }
    } catch (error) {
        ConsolePrintError(`DATABASE LOG: Error connecting to MongoDB:  + ${error}`);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}
