import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";
import "./App.css";
import { Artists } from "./components/Artists";
import Navbar from "./components/Navbar";
import { DisplayList } from "./components/DisplayList";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artistPictures, setArtistPictures] = useState([]);

  useEffect(() => {
    async function getToken() {
      try {
        let result = await axios.get(
          "https://spotifyserver.manasa1998.repl.co"
        );
        // console.log(result);
        if (result.status === 200) {
          setAccessToken(result.data.resultData);
        }
      } catch (err) {
        console.error(err, "at getToken method while fetching");
      }
    }
    getToken();
  }, []);
  let searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
  async function handleSearch() {
    console.log("button clicked", searchInput);
    const fetchArtistId = async () => {
      try {
        let artistSearchRes = await fetch(
          "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
          searchParameters
        );

        artistSearchRes = await artistSearchRes.json();
        console.log(artistSearchRes);
        return artistSearchRes.artists.items[0].id;
      } catch (err) {
        console.error(err, "at artistSearchRes");
        return;
      }
    };
    let artistId = await fetchArtistId();
    console.log(artistId);
    const fetchArtistAlbums = async () => {
      try {
        let artistAlbums = await fetch(
          "https://api.spotify.com/v1/artists/" + artistId + "/albums",
          searchParameters
        );
        artistAlbums = await artistAlbums.json();
        console.log(artistAlbums.items);
        let artistImages = artistAlbums.items
          .map((item) => item.images[0])
          .reduce((acc, curr) => [...acc, curr], []);
        console.log(artistImages, "artistImages");
        return artistImages;
      } catch (err) {
        console.error(err, "at fetchArtistAlbums");
        return;
      }
    };
    let albums = await fetchArtistAlbums();
    setArtistPictures(albums);
    console.log(albums, "at line 45");
  }

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/artists" element={<Artists />}></Route>
      </Routes>
      <main>
        <section className="center">
          <div className="search__container">
            <input
              type="search"
              name="search-input"
              id="search-input"
              className="search__input"
              placeholder="Search for favorite artist"
              value={searchInput}
              onInput={(e) => {
                console.log("at search", e.target.value);
                setSearchInput(() => e.target.value);
              }}
              onBlur={(e) => {
                if (searchInput.length <= 0) return;
                handleSearch();
              }}
            />
            <button
              type="button"
              id="search-button"
              className="search__button"
              onClick={() => {
                if (searchInput.length <= 0) return;
                handleSearch();
              }}
            >
              Search
            </button>
          </div>
        </section>
        <DisplayList pictures={artistPictures.length > 0 && artistPictures} />
      </main>
    </div>
  );
}

export default App;
