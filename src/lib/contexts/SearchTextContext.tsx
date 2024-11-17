import { createContext, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

type SearchTextContextType = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};
export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
);

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };
  return (
    <SearchTextContext.Provider value={{ searchText, handleChangeSearchText, debouncedSearchText }}>
      {children}
    </SearchTextContext.Provider>
  );
}
