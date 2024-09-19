import express from "express";
import {generateRandomString} from "./utils.mjs";
import querystring from "querystring";
import cors from "cors";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const redirect_uri = `http://localhost:8888/callback`;

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000", "https://accounts.spotify.com/authorize*"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));

const port = 8888;

app.get('/', (req, res) => {
  console.log("SERVER CALLED")
  res.json({"response:": "Welcome to my api!"});
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-modify-playback-state';

  console.log("adding scope")

  res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
});


app.get('/callback', async function (req, res) {

    console.log("Inside callback")

    var code = req.query.code || null;
    var state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        var authOptions = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            body: new URLSearchParams({
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        console.log("calling spotify endpoint")
        const response = await fetch(authOptions.url, authOptions);
        const data = await response.json();
        res.redirect(`${process.env.REACT_APP_CLIENT_URL}/?token=${data.access_token}`);
    }
});
