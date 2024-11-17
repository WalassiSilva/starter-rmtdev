import { forwardRef } from "react";
import { useBookmarksContext } from "../lib/hooks/useBookmarksContext";
import JobList from "./JobList";

const BookmarsPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  return (
    <div className="bookmarks-popover" ref={ref}>
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  );
});

export default BookmarsPopover;
