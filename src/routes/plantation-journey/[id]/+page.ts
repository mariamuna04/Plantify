export const load = async ({fetch, params}: any) => {
    let id: string = params.id;

    const response = await fetch('/api/journey/FetchJourneyByID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    });

    const data = await response.json();

    return {
        journey: JSON.stringify(data),
        id: id
    }
}