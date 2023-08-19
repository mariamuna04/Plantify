import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "$env/static/private";
import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK, ConsolePrintWarn} from "$lib/server/ConsolePrint";

// Login POST API
export const POST = async ({request}: any) => {
    // Server Should receive a Credential JSON object
    const credentials: Credentials = await request.json();

    // Try to connect to MongoDB
    try {
        // Connect to MongoDB, and get the users' collection. Run a query to find a user with the same email and password
        const database = await connectToMongo();
        const usersCollection = database.collection('users');
        const query = {email: credentials.email, password: credentials.password};
        const success = await usersCollection.findOne(query);

        // By this point, the server has either found a user with the same email and password, or it has not.
        // If found, generate a token and send it back to the client. If not found, send a 401 status code.
        if (success) {
            ConsolePrintOK("LoginAPI API RESPONSE: status 200")

            // Generate a token
            const token: string = generateToken(
                {email: credentials.email},
                JWT_SECRET,
                '12h'
            );
            // Get the user's name
            const name: string = success.name;
            // Get the user's email
            const email: string = success.email;

            // Update the user's token in the database
            await usersCollection.updateOne(query, {$set: {token: token}})

            // Return the token, name and email to the client
            return new Response(JSON.stringify({
                name: name, email: email, token: token
            }), {status: 200})
        } else {
            ConsolePrintWarn("LoginAPI API RESPONSE: status 401")

            // Return a 401 status code if the user is not found
            return new Response(null, {status: 401})
        }
    } catch (error) {
        ConsolePrintError(`DATABASE LOG: Error connecting to MongoDB: ${error}`);
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}

// Generate a token with the payload, secret and expiration time using the jsonwebtoken library
function generateToken(payload: any, secret: string, expiresIn: string): string {
    return jwt.sign(payload, secret, {expiresIn});
}
