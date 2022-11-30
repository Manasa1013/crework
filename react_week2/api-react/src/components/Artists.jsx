import { Search } from "./Search";
import { handleSearch } from "../utils/CallsToApi";
import { DisplayList } from "./DisplayList";
import { useSearch } from "../Contexts/SearchContext";
export function Artists() {
  const { pictures } = useSearch();

  return (
    <>
      <section className="center">
        <Search handleSearch={handleSearch} />
      </section>
      <DisplayList pictures={pictures} />
    </>
  );
}
