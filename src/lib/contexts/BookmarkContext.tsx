import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type BookmarkContextProvider = {
  children: React.ReactNode;
};
type BookmarkContext = {
  bookmarkIds: number[];
  handleToogleBookmark: (id: number) => void;
};

export const BookmarkContext = createContext<BookmarkContext | null>(null);

export default function BookmarkContextProvider({
  children,
}: BookmarkContextProvider) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>(
    "BOOKMARKS_ID",
    []
  );
  const handleToogleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkIds,
        handleToogleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
