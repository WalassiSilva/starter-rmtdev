import { useSearchTextContext } from "../lib/hooks/useSearchTextContext";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  return (
    <form action="#" onSubmit={(e) => e.preventDefault()} className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => handleChangeSearchText(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
