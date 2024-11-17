import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks/useBookmarksContext";

type BookmarkIconProps = { id: number };
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkIds, handleToggleBookmark } = useBookmarksContext();
  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        handleToggleBookmark(id);
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <BookmarkFilledIcon
        className={`${bookmarkIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
