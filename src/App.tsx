import React, {useEffect} from 'react';
import './App.css';
import {fetchSongs} from "./utils/playlists";
import {Song} from "./utils/models";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Dashboard} from "./components/Dashboard";
import {Login} from "./components/Login";

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

  return (
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
  );
}

export default App;
