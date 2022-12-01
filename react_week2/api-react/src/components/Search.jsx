import { useSearch } from "../Contexts/SearchContext";

export function Search({ handleSearch, searchType }) {
  const { state, searchDispatch } = useSearch();

  return (
    <>
      <div className="search__container">
        <input
          type="search"
          name="search-input"
          id="search-input"
          className="search__input"
          placeholder={`Search for ${searchType}s`}
          value={state.searchInput}
          onInput={(e) => {
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
            } else {
              handleSearch(
                state.searchInput,
                state.accessToken,
                searchDispatch,
                searchType
              );
            }
          }}
        />
        <button
          type="button"
          id="search-button"
          className="search__button"
          onClick={() => {
            if (state.searchInput.length <= 0) {
              console.log(
                state.searchInput,
                state.searchInput.length,
                "at search,button clicked"
              );
            } else {
              handleSearch(
                state.searchInput,
                state.accessToken,
                searchDispatch,
                searchType
              );
            }
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}
