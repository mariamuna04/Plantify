import {OAuth2Client} from "google-auth-library";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "$env/static/private";
import {redirect} from "@sveltejs/kit";
import {ConsolePrintOK} from "$lib/server/ConsolePrint";
import {connectToMongo} from "$lib/server/mongoDatabase/database";

let status = -1;

export const GET = async ({url}: any) => {
    ConsolePrintOK("Redirected to Server GET API");
    const redirectURL = 'http://localhost:5173/api/oauth';
    //const redirectURL = 'https://plantify-six.vercel.app/api/oauth';
    const code = url.searchParams.get('code');

    try {
        const oAuth2Client = new OAuth2Client(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            redirectURL
        );
        const token = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(token.tokens);
        const user = oAuth2Client.credentials;

        ConsolePrintOK(`User access token fetched [ ${user.access_token} ]`);
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.access_token}`);
        const data = await response.json();
        ConsolePrintOK(`User details fetched... { ${data.email}, ${data.given_name}, ${data.family_name} }`);

        // Check if the user already exist
        if (await userExist(data.email)) {
            // Just log in
            console.log(`Logged in as ${data.email}`);
            status = 0;

        } else {
            // Create new user
            const userProperties: UserProperties = {
                firstName: data.given_name,
                lastName: data.family_name,
                email: data.email,
                password: ''
            }
            await createUser(userProperties);
            console.log(`New user Created with email ${data.email}`);
            status = 1
        }

    } catch (e) {
        console.error(e);
    }
    if (status === 0) {
        throw redirect(302, "/login");
    } else if(status === 1) {
        throw redirect(302, "/sign-up")
    } else throw redirect(302, "/");

}

async function userExist(email: string) {
    const database = await connectToMongo();
    const usersCollection = database.collection('users');
    const query = {
        email: email,
    };
    return await usersCollection.findOne(query);
}

async function createUser(userProperties: UserProperties) {
    const database = await connectToMongo();
    const usersCollection = database.collection('users');
    const query = {
        email: userProperties.email,
        password: userProperties.password,
        firstName: userProperties.firstName,
        lastName: userProperties.lastName,
    };
    return await usersCollection.insertOne(query);

}
