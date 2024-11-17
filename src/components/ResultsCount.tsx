import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";

export default function ResultsCount() {
  const { totalCount } = useJobItemsContext();

  return (
    <p className="count">
      <span className="u-bold">{totalCount}</span> results
    </p>
  );
}
