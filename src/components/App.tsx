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
import { useJobItems } from "../lib/hooks/useJobItems";
import { Toaster } from "react-hot-toast";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const jobItemsSliced = jobItems?.slice(0, 7) || [];
  const totalCount = jobItems?.length || 0;

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
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
