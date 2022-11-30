export const BACKEND = "https://spotifyserver.manasa1998.repl.co";
export const SPOTIFYAPI = "https://api.spotify.com/v1";
export async function handleSearch(searchInput, accessToken, searchDispatch) {
  //defining search parameters from accessToken
  let searchParameters = getSearchParams(accessToken);
  console.log("button clicked", searchInput, searchParameters, accessToken);

  const fetchArtistId = async () => {
    try {
      let artistSearchRes = await fetch(
        `${SPOTIFYAPI}/search?q=` + searchInput + "&type=artist",
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
        `${SPOTIFYAPI}/artists/` + artistId + "/albums",
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
  let artistImageList = await fetchArtistAlbums();
  searchDispatch({ type: "SET_PICTURES", payload: artistImageList });
  console.log(artistImageList, "at handleSearch Method");
}

export const getSearchParams = (accessToken) => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
};
