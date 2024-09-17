import express from "express";
import {generateRandomString} from "./utils.mjs";
import querystring from "querystring";
import cors from "cors";

var client_id = process.env.REACT_APP_CLIENT_ID;
var redirect_uri = `${process.env.REACT_APP_SERVER_URL}/callback`;

const app = express();
app.use(cors)
const port = 8888;

app.get('/', (req, res) => {
  console.log("SERVER CALLED")
  res.send('Welcome to my server!');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


app.get('/login', function(req, res) {
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