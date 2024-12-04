import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const CLIENT_ID = "13dc8df8d7db4929b68b8aa249612acc";
const CLIENT_SECRET = "bcd79581ce9241858c03cbe07664dfc4";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [genres, setGenres] = useState([]);
  //SPOTIFY API ACCESS TOKEN
  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  const fetchGenres = () => {
    var genreParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + accessToken,
      },
    };

    fetch(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      genreParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Genres:", data.genres);
        setGenres(data.genres); // Save genres to state
      })
      .catch((error) => console.error("Error fetching genres:", error));
  };

  fetchGenres();
  return (
    <div>
      <h1>ExplorGenres</h1>
      <p>Explore genres from Spotify and discover your next favorite song</p>
    </div>
  );
}

export default App;
