interface SongInfo {
    id: string;
    name: string;
    artists: string[];
    year: number;
    track_number: number;
    album_id: string;
}

export class Song {
    id: string;
    name: string;
    artists: string[];
    year: number;
    album_id: string;
    track_number: number;

    constructor(songInfo: SongInfo) {
        this.id = songInfo.id;
        this.name = songInfo.name;
        this.artists = songInfo.artists;
        this.year = songInfo.year;
        this.track_number = songInfo.track_number;
        this.album_id = songInfo.album_id;
    }
}