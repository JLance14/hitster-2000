import React, {useState} from 'react';
import './TrackPlayer.css';
import {Song} from "../../utils/models";
import {pauseSong, playSong} from "../../utils/spotify";

interface Props {
    songs: Song[]
}

export const TrackPlayer = (props: Props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSongRevealed, setIsSongReveald] = useState<boolean>(false)
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0)

    const togglePlayPause = () => {
        if (isPlaying) {
            pauseSong()
        }
        else {
            if (props.songs[currentSongIndex]) {
                playSong(props.songs[currentSongIndex] && props.songs[currentSongIndex].album_id, props.songs[currentSongIndex] && props.songs[currentSongIndex].track_number)
            }
        }
        setIsPlaying(!isPlaying);
    };

    const revealSong = () => {
        setIsSongReveald(!isSongRevealed)
    };

    const nextSong = () => {
        const nextSong = props.songs[currentSongIndex+1]
        playSong(nextSong && nextSong.album_id, nextSong && nextSong.track_number)
        setCurrentSongIndex(currentSongIndex+1)
        setIsPlaying(true)
    };

    return (
        <div className="track-player">
            <button className="control-button big-button" style={{ padding: 0 }} onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="control-button" onClick={revealSong}>
                Reveal Song
            </button>
            <button className="control-button" onClick={nextSong}>
                Next Song
            </button>
            {isSongRevealed && props.songs[currentSongIndex] && (
                <div className="song-info">
                    <img src={props.songs[currentSongIndex].album_image_url} alt={props.songs[currentSongIndex].name} className="song-image" />
                    <div className="song-meta">
                        <h2>{props.songs[currentSongIndex].name}</h2>
                        <p>{props.songs[currentSongIndex].artists.join(", ")}</p>
                        <p>{props.songs[currentSongIndex].year}</p>
                    </div>

                </div>
            )}
        </div>
    );
};

