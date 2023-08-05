import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "$env/static/private";
import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import ConsolePrintWarn, {ConsolePrintError, ConsolePrintOK} from "$lib/server/ConsolePrint";

export const POST = async ({request}: any) => {
    const credentials: Credentials = await request.json();

    try {
        const database = await connectToMongo();
        const usersCollection = database.collection('users');
        const query = {
            email: credentials.email,
            password: credentials.password
        };
        const success = await usersCollection.findOne(query);

        if (success) {
            ConsolePrintOK("LoginAPI API RESPONSE: status 200")
            const token = generateToken(
                {email: credentials.email},
                JWT_SECRET,
                '12h'
            );
            console.log(token);
            return new Response(JSON.stringify({token: token}), {status: 200})
        } else {
            ConsolePrintWarn("LoginAPI API RESPONSE: status 401")
            return new Response(null, {status: 401})
        }
    } catch (error) {
        ConsolePrintError(`DATABASE LOG: Error connecting to MongoDB: ${error}`);
        return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}

function generateToken(payload: any, secret: string, expiresIn: string): string {
    return jwt.sign(payload, secret, {expiresIn});
}
