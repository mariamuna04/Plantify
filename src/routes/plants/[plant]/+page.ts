export const load = async ({fetch, params}:any) => {
    let plant = params.plant;
    const response = await fetch('/api/PlantsCollection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: plant})
    });
    const data = await response.json();

    return {
        plant: JSON.stringify(data)
    }
}