import {Song} from './models'
import {callSpotifyEndpoint} from "./spotify";

const PLAYLIST_2000_ID = "1udqwx26htiKljZx4HwVxs"
const PLAYLIST_2010_BANGERS_ID = "357fWKFTiDhpt9C69CMG4q"
const PLAYLIST_2010_NOSTALGIA_ID = "37i9dQZF1EIf9owOnDezxl"
const PLAYLIST_2020_ID = "37i9dQZF1DX2M1RktxUUHG"

const PLAYLIST_IDS = [PLAYLIST_2000_ID, PLAYLIST_2010_BANGERS_ID, PLAYLIST_2010_NOSTALGIA_ID, PLAYLIST_2020_ID]

const shuffleSongs = (array: Song[]): Song[] => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const fetchSongs = async () => {
    let songs: Song[] = []
    for (const playlist_id of PLAYLIST_IDS) {
        const results = await callSpotifyEndpoint(`/playlists/${playlist_id}/tracks`)
        const playlist_songs = results["items"]


        for (const playlist_song of playlist_songs) {
            const track = playlist_song["track"]

            songs.push(new Song({
                id: track["id"],
                name: track["name"],
                artists: track["artists"].map((artist: any) => artist["name"]),
                year: track["album"]["release_date"],
                album_id: track["album"]["id"],
                track_number: track["track_number"],
                album_image_url: track["album"]["images"][1]["url"]
            }))
        }
    }
    return shuffleSongs(songs)
}