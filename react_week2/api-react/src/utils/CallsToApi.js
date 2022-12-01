export const BACKEND = "https://spotifyserver.manasa1998.repl.co";
export const SPOTIFYAPI = "https://api.spotify.com/v1";

const matchSearchType = (searchType, searchInput, id) => {
  switch (searchType) {
    case "artist":
      return {
        searchEndPoint: `${SPOTIFYAPI}/search?q=${searchInput}&type=artist`,
        searchResEndPoint: `${SPOTIFYAPI}/artists/${id}/albums`,
      };
    case "playlist":
      return {
        searchEndPoint: `${SPOTIFYAPI}/search?q=${searchInput}&type=playlist`,
        // searchResEndPoint: `${SPOTIFYAPI}/playlists/${id}/images`,
        searchResEndPoint: `${SPOTIFYAPI}/search?q=${searchInput}&type=playlist`,
      };
    case "track":
      return {
        searchEndPoint: `${SPOTIFYAPI}/search?q=${searchInput}&type=track`,
        searchResEndPoint: `${SPOTIFYAPI}/tracks/${id}`,
      };
    default:
      return {
        searchEndPoint: `${SPOTIFYAPI}/search?q=${searchInput}&type=album`,
        searchResEndPoint: `${SPOTIFYAPI}/tracks/${id}/albums`,
      };
  }
};
export async function handleSearch(
  searchInput,
  accessToken,
  searchDispatch,
  searchType
) {
  //defining search parameters from accessToken
  let searchParameters = getSearchParams(accessToken);
  console.log("button clicked", searchInput, searchParameters, accessToken);
  const fetchId = async (searchType) => {
    try {
      let { searchEndPoint } = matchSearchType(searchType, searchInput);
      let searchRes = await fetch(searchEndPoint, searchParameters);
      searchRes = await searchRes.json();
      console.log(searchRes, "at fetchId");
      return searchRes[`${searchType}s`].items[0].id;
    } catch (err) {
      console.error(err, "at fetchId,error");
      return;
    }
  };

  let id = await fetchId(searchType);
  console.log(id, "at fetchId extracting id");
  const fetchAlbums = async (searchType) => {
    try {
      let { searchResEndPoint } = matchSearchType(searchType, searchInput, id);
      let albums = await fetch(searchResEndPoint, searchParameters);
      albums = await albums.json();
      console.log(albums, "at fetchAlbums fetching albums");
      return albums;
      //   return albums.items
      //     .map((item) => item.images[0])
      //     .reduce((acc, curr) => [...acc, curr], []);
    } catch (err) {
      console.error(err, "at fetchAlbums fetching albums");
      return;
    }
  };
  let resultAlbums = await fetchAlbums(searchType);

  const fetchImages = async (response) => {
    try {
      let images = [];
      if (searchType === "artist") {
        images = await response.items
          .map((item) => item.images[0])
          .reduce((acc, curr) => [...acc, curr], []);
      } else if (searchType === "track") {
        images = await response.album.images;
      } else if (searchType === "playlist") {
        images = await response.playlists.items
          .map((item) => item.images)
          .reduce((acc, curr) => [...acc, ...curr], []);
      }
      console.log(images);
      return images;
    } catch (err) {
      console.error(err, "at fetchImages method");
    }
  };
  let imagesRes = await fetchImages(resultAlbums);
  searchDispatch({ type: "SET_PICTURES", payload: imagesRes });
  console.log(imagesRes, "at handleSearch Method");
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
