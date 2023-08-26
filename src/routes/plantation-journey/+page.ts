import {Session} from "../Session";

export const load = async ({fetch}:any) => {

    const response = await fetch('/api/journey/FetchJourney', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: Session.getEmail()})
    });

    const data = await response.json();

    return {
        journey: JSON.stringify(data)
    }
}