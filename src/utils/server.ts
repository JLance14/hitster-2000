export const BASE_SERVER_URL = process.env.REACT_APP_SERVER_URL

export const call_server_endpoint = async (endpoint: string, method: string = "GET", body: any = null) => {

    console.log(`calling server endpoint ${endpoint}`)

    console.log(`Fetching: ${BASE_SERVER_URL}${endpoint}`)

    const response = await fetch(`${BASE_SERVER_URL}${endpoint}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })


    if (!response.ok) {
        console.log("ERROR IN SERVER RESPONSE")
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
