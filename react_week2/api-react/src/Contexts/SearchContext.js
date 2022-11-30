import { createContext, useContext, useReducer } from "react";

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [state, searchDispatch] = useReducer(SearchReducer, {
    searchInput: "",
    accessToken: "",
    pictures: [],
  });
  return (
    <SearchContext.Provider value={{ state, searchDispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const SearchReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN": {
      return { ...state, accessToken: action.payload };
    }
    case "SET_SEARCH_INPUT": {
      console.log(action.payload, "at set-search-input");
      return { ...state, searchInput: action.payload };
    }
    case "SET_PICTURES": {
      console.log(action.payload, "at set-pictures");
      return { ...state, pictures: action.payload };
    }
    default:
      return;
  }
};
