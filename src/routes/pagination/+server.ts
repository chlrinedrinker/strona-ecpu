import { getCollection } from "$db/pracownicy"; 

export async function GET(request: Request): Promise<Response> {   
    // get skip and limit from searchParams in request
    const url = new URL(request.url);
    let skip = Number(url.searchParams.get("skip")); 
	if(skip < 0) 
        skip = 0;

    // get repositories from MongoDB
    const repositories = await getCollection("repositories", 0, 0);

    // return JSON response
	return new Response(JSON.stringify(repositories));
}