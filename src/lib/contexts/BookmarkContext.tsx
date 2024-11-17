import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useJobItems } from "../hooks/useJobItem";
import { TJobItemDetails } from "../types";

type BookmarkContextProvider = {
  children: React.ReactNode;
};
type BookmarkContext = {
  bookmarkIds: number[];
  handleToggleBookmark: (id: number) => void;
  isLoading: boolean;
  bookmarkedJobItems: TJobItemDetails[];
};

export const BookmarkContext = createContext<BookmarkContext | null>(null);

export default function BookmarkContextProvider({
  children,
}: BookmarkContextProvider) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>(
    "BOOKMARKS_ID",
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
   useJobItems(bookmarkIds);
  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarkIds,
        bookmarkedJobItems,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
