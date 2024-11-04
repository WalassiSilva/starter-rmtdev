type ResultsCountProps = {
  totalCount: number;
};

export default function ResultsCount({ totalCount }: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalCount}</span> results
    </p>
  );
}
