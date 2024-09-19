import {getSpotifyToken} from "./login";

export const BASE_SPOTIFY_URL = "https://api.spotify.com/v1"

// TODO V2 - switch http method to enum
export const call_spotify_endpoint = async (endpoint: string, method: string = "GET", body: any = null) => {
    const token = await getSpotifyToken()
    console.log({token})

    const response = await fetch(`${BASE_SPOTIFY_URL}${endpoint}`, {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: body
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
