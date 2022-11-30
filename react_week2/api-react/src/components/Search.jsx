import { useSearch } from "../Contexts/SearchContext";

export function Search({ handleSearch }) {
  const { state, searchDispatch } = useSearch();
  return (
    <>
      <div className="search__container">
        <input
          type="search"
          name="search-input"
          id="search-input"
          className="search__input"
          placeholder="Search for favorite artist"
          value={state.searchInput}
          onInput={(e) => {
            console.log("at search", e.target.value);
            searchDispatch({
              type: "SET_SEARCH_INPUT",
              payload: e.target.value,
            });
          }}
          onBlur={(e) => {
            if (state.searchInput.length <= 0) {
              console.log(
                state.searchInput,
                state.searchInput.length,
                "at OnBlur"
              );
            }
            handleSearch(state.searchInput, state.accessToken, searchDispatch);
          }}
        />
        <button
          type="button"
          id="search-button"
          className="search__button"
          onClick={() => {
            if (state.searchInput.length <= 0) return;
            handleSearch(state.searchInput, state.accessToken, searchDispatch);
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}
