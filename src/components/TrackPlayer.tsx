import {useEffect} from "react";
import {call_spotify_endpoint} from "../utils/spotify";

export const TrackPlayer = () => {
    useEffect(() => {
        if (localStorage.getItem("spotify_token")) {
            call_spotify_endpoint("/me/player/play", localStorage.getItem("spotify_token"), "PUT", JSON.stringify({
                "context_uri": "spotify:album:7ppEt8YdvnAWeNTKNPR4ca",
                "offset": {
                    "position": 4
                },
                "position_ms": 0
            }))
        }
    }, [localStorage.getItem("spotify_token")]);

    return (
        <>TRACK PLAYER</>
    )
}