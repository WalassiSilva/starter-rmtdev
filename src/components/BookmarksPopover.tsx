import { forwardRef } from "react";
import { useBookmarksContext } from "../lib/hooks/useBookmarksContext";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarsPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>,
    document.body
  );
});

export default BookmarsPopover;
