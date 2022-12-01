import { Search } from "./Search";
import { handleSearch } from "../utils/CallsToApi";
import { DisplayList } from "./DisplayList";
import { useSearch } from "../Contexts/SearchContext";
export function Tracks() {
  const { state } = useSearch();

  return (
    <div style={{ width: "100%", height: "100vw" }}>
      <section className="center">
        <Search handleSearch={handleSearch} searchType="track" />
      </section>
      {<DisplayList pictures={state.pictures} />}
    </div>
  );
}
