import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK, ConsolePrintWarn} from "$lib/server/ConsolePrint";

export const POST = async ({request}: any) => {
    const answer: Answer = await request.json();

    try {
        const database = await connectToMongo();
        const questionAnswerCollection = database.collection('questionAnswer');

        const query = {
            parentQuestionID: answer.parentQuestionId,
            name: answer.name,
            email: answer.email,
            body: answer.body,
        };

        const success = await questionAnswerCollection.insertOne(query);

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
