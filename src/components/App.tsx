import Logo from "./Logo";
import Footer from "./Footer";
import JobList from "./JobList";
import { useState } from "react";
import Container from "./Container";
import Background from "./Background";
import SearchForm from "./SearchForm";
import ResultsCount from "./ResultsCount";
import { useJobItems } from "../lib/hooks";
import Header, { HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import BookmarksButton from "./BookmarksButton";
import Sidebar, { SidebarTop } from "./Sidebar";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";

function App() {
  const [searchText, setSearchText] = useState("");
  const { jobItemsSliced, isLoading, totalCount } = useJobItems(searchText);

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
    </>
  );
}

export default App;
