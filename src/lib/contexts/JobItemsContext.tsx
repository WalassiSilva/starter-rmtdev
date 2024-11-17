import { createContext, useState } from "react";
import { PageDirection, SortBy, TJobItem } from "../types";
import { useSearchQuery } from "../hooks/useJobItems";
import { RESULTS_PER_PAGE } from "../constants";
import { useSearchTextContext } from "../hooks/useSearchTextContext";

type JobItemsContextType = {
  jobItems: TJobItem[] | undefined;
  jobItemsSortedAndSliced: TJobItem[];
  isLoading: boolean;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (sortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // dependencies on other contexts
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // derived / computed state
  const totalCount = jobItems?.length || 0;
  const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });
  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  // event handlers / actions
  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleChangeSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        jobItemsSortedAndSliced,
        isLoading,
        totalCount,
        totalPages,
        currentPage,
        sortBy,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
