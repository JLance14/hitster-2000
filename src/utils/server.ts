export const BASE_SERVER_URL = process.env.REACT_APP_SERVER_URL

export const call_server_endpoint = async (endpoint: string, method: string = "GET", body: any = null) => {

    console.log(`calling server endpoint ${endpoint}`)

    const response = await fetch(`${BASE_SERVER_URL}${endpoint}`, {
        method: method,
        headers: {
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
