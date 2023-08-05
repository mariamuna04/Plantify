export const GET = async ({request}:any) => {
    const authToken = await request.headers.get('session');
    console.log(authToken);
    return new Response(JSON.stringify(authToken), {status: 200})
};
