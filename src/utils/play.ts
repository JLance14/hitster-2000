import {call_endpoint} from "./spotify";

export const playTrack = async () => {
    await call_endpoint("/me/player/play", "PUT", {
        "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
        "offset": {
            "position": 5
        },
        "position_ms": 0
    })
}