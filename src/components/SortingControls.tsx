import { SortBy } from "../lib/types";

type SortingControlsProps = {
  sortBy: SortBy;
  onClick: (sortBy: SortBy) => void;
};

export default function SortingControls({
  onClick,
  sortBy,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        onClick={() => onClick("relevant")}
        sortBy="relevant"
        active={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => onClick("recent")}
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
