import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchSongs} from "./utils/playlists";
import {Song} from "./utils/models";
import {playTrack} from "./utils/play";

const App = () => {

  const [songs, setSongs] = React.useState<Song[]>([])

  useEffect(() => {

    const getSongs = async () => {
      try {
        const playlistSongs = await fetchSongs();
        console.log({playlistSongs})
        setSongs(playlistSongs)

      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    getSongs();
  }, []);

  // useEffect(() => {
  //   console.log("SWITCHING SONG")
  //   playTrack()
  //   }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
