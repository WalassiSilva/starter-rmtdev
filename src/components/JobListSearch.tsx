import JobList from "./JobList";
import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";

export default function JobListSearch() {
  const {jobItemsSortedAndSliced, isLoading} = useJobItemsContext();
  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
}
