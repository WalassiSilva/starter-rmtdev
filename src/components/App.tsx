import Logo from "./Logo";
import Footer from "./Footer";
import Container from "./Container";
import Background from "./Background";
import SearchForm from "./SearchForm";
import ResultsCount from "./ResultsCount";
import { Toaster } from "react-hot-toast";
import JobListSearch from "./JobListSearch";
import Header, { HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import BookmarksButton from "./BookmarksButton";
import Sidebar, { SidebarTop } from "./Sidebar";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";

function App() {
  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobListSearch />
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
