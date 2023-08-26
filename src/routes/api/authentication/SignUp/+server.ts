import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintWarn, ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const POST = async ({request}: any) => {
    const user: User = await request.json();

    try {
        const database = await connectToMongo();
        const usersCollection = database.collection('users');

        const query = {
            name: user.name,
            email: user.email,
            password: user.password,
            token: null,
        };

        const success = await usersCollection.insertOne(query);

        if (success) {
            ConsolePrintOK("SignUpAuthentication API RESPONSE: status 200")
            return new Response(JSON.stringify(user), {status: 200})
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
