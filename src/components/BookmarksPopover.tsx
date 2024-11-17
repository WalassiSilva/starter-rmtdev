import { useBookmarksContext } from "../lib/hooks/useBookmarksContext";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const {bookmarkedJobItems, isLoading } = useBookmarksContext();
  return (
    <div className="bookmarks-popover">
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  );
}
