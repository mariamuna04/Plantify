import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK, ConsolePrintWarn} from "$lib/server/ConsolePrint";

// LogOut POST API
export const POST = async ({request}: any) => {
    const body = await request.json();
    // Server Should receive a JSON object with an email and token
    // {
    //     email: string,
    //     token: string
    // }

    // Try to connect to MongoDB
    try {
        // Connect to MongoDB, and get the users' collection. Run a query to find a user with the same email and token
        const database = await connectToMongo();
        const usersCollection = database.collection('users');
        const query = {email: body.email, token: body.token };
        const success = await usersCollection.findOne(query);

        // By this point, the server has either found a user with the same email and token, or it has not.
        // If found, update the user's token in the database. If not found, send a 401 status code.
        if (success) {
            ConsolePrintOK("LoginAPI API RESPONSE: status 200")

            // Update the user's token in the database to null
            await usersCollection.updateOne(query, {$set: {token: null}});

            // Return a 200 status code
            return new Response(JSON.stringify({}), {status: 200});
        } else {
            ConsolePrintWarn("LoginAPI API RESPONSE: status 401")

            // Return a 401 status code if the user and token is not found
            return new Response(null, {status: 401})
        }
    } catch (error) {
        ConsolePrintError(`DATABASE LOG: Error connecting to MongoDB: ${error}`);
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}
