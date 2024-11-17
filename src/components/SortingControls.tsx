import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";
import { SortBy } from "../lib/types";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        onClick={() => handleChangeSortBy("relevant")}
        sortBy="relevant"
        active={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => handleChangeSortBy("recent")}
        sortBy="recent"
        active={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  sortBy: SortBy;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

function SortingButton({
  sortBy,
  active,
  children,
  onClick,
}: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--${sortBy} ${
        active && "sorting__button--active"
      }`}
    >
      {children}
    </button>
  );
}
