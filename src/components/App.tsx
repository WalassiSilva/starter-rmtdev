import Logo from "./Logo";
import Footer from "./Footer";
import JobList from "./JobList";
import { useState } from "react";
import Container from "./Container";
import Background from "./Background";
import SearchForm from "./SearchForm";
import ResultsCount from "./ResultsCount";
import Header, { HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import BookmarksButton from "./BookmarksButton";
import Sidebar, { SidebarTop } from "./Sidebar";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";
import { useDebounce } from "../lib/hooks/useDebounce";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { PageDirection, SortBy } from "../lib/types";
import { useSearchQuery } from "../lib/hooks/useJobItems";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortby] = useState<SortBy>("relevant");
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });
  const jobItemsSortedAndSliced =
    jobItemsSorted.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ) || [];
  const totalCount = jobItems?.length || 0;
  const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

  const handleChangePage = (direction: PageDirection) => {
    if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleChangeSorting = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortby(newSortBy);
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalCount={totalCount} />
            <SortingControls onClick={handleChangeSorting} sortBy={sortBy} />
          </SidebarTop>
          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
          <PaginationControls
            onClick={handleChangePage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
