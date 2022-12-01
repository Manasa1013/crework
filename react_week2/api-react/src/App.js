import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { useSearch } from "./Contexts/SearchContext";
import axios from "axios";
import "./App.css";
import { Artists } from "./components/Artists";
import { Tracks } from "./components/Tracks";
import { Playlists } from "./components/Playlists";
import { Home } from "./components/Home";
import Navbar from "./components/Navbar";
import { BACKEND } from "./utils/CallsToApi";
function App() {
  const { searchDispatch } = useSearch();

  useEffect(() => {
    async function getToken() {
      try {
        let result = await axios.get(BACKEND);
        // console.log(result);
        if (result.status === 200) {
          searchDispatch({
            type: "SET_TOKEN",
            payload: result.data.resultData,
          });
        }
      } catch (err) {
        console.error(err, "at getToken method while fetching");
      }
    }
    getToken();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Artists />}></Route>
        <Route path="/artists" element={<Artists />}></Route>
        <Route path="/tracks" element={<Tracks />}></Route>{" "}
        <Route path="/playlists" element={<Playlists />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
      <main></main>
    </div>
  );
}

export default App;
