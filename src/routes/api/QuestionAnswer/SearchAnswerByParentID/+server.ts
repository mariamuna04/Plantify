import {closeMongoConnection, connectToMongo} from "$lib/server/mongoDatabase/database";
import {ConsolePrintError, ConsolePrintOK, ConsolePrintWarn} from "$lib/server/ConsolePrint";

export const POST = async ({request}: any) => {
    const parentId = await request.json();
    const {parentQuestionID} = parentId;

    try {
        const database = await connectToMongo();
        const questionAnswerCollection = database.collection('questionAnswer');
        const success = await questionAnswerCollection.find(
            {parentQuestionID: parentQuestionID}
        ).toArray();

        if (success) {
            ConsolePrintOK("SignUpAuthentication API RESPONSE: status 200")
            return new Response(JSON.stringify(success), {status: 200})
        } else {
            ConsolePrintWarn("SignUpAuthentication API RESPONSE: status 401")
            return new Response(JSON.stringify({"Message": "not Found"}), {status: 401})
        }
    } catch (error) {
        ConsolePrintError(`DATABASE LOG: Error connecting to MongoDB: ${error}`);
        return new Response(JSON.stringify({auth: 'Internal Server Error'}), {status: 500})
    } finally {
        await closeMongoConnection();
    }
}
