import {getToken} from "./login";

export const BASE_URL = "https://api.spotify.com/v1"

// TODO V2 - switch http method to enum
export const call_endpoint = async (endpoint: string, method: string = "GET", body: any = null) => {

    console.log(`calling endpoint ${endpoint}`)

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: method,
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
        },
        body: body
    })

    console.log(response)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
