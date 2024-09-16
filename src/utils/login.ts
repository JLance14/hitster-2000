import { Buffer } from 'buffer';
// @ts-ignore
window.Buffer = Buffer;

let scope = 'user-modify-playback-state';

const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        'grant_type': 'client_credentials',
        "scope": scope
    }),
    json: true
};


export const getToken = async () => {
    try {
        const response = await fetch(authOptions.url, authOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("ERROR:", error);
    }
};
