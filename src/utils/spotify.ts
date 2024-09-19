import {getSpotifyToken} from "./login";

export const BASE_SPOTIFY_URL = "https://api.spotify.com/v1"

// TODO V2 - switch http method to enum
export const call_spotify_endpoint = async (endpoint: string, token?: string | null, method: string = "GET", body: any = null) => {
    let bearer_token = ""
    if (!token)
        bearer_token = await getSpotifyToken()
    else
        bearer_token = token

    const response = await fetch(`${BASE_SPOTIFY_URL}${endpoint}`, {
        method: method,
        headers: {
            'Authorization': `Bearer ${bearer_token}`,
            'Content-Type': 'application/json',
        },
        body: body
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204)
        return null

    return response.json()
}
