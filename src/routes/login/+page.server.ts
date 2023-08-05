import {OAuth2Client} from "google-auth-library";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "$env/static/private";
import {redirect} from "@sveltejs/kit";
import {ConsolePrintOK} from "$lib/server/ConsolePrint";

export const actions = {
    OAuth2: () => {
        ConsolePrintOK('Attempting to Sign in with Google using OAuth2.0');
        const redirectURL = 'http://localhost:5173/api/oauth';
        //const redirectURL = 'https://plantify-six.vercel.app/api/oauth';

        const oAuth2Client = new OAuth2Client(
            GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectURL
        );

        const authorizeURL = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile email',
            prompt: 'consent',
        });
        ConsolePrintOK('Redirecting to consent screen [' + authorizeURL + ']');
        throw redirect(302, authorizeURL);
    },

    appleAuth: () => {
        // implement apple auth
        console.log('Apple Auth');
    }
}
