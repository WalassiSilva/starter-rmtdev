import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";

type PaginationButtonProps = {
  direction: PageDirection;
  currentPage: number;
  onClick: () => void;
};
export default function PaginationControls() {

  const {currentPage, totalPages, handleChangePage} = useJobItemsContext()
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={() => handleChangePage("prev")}
          direction="prev"
          currentPage={currentPage}
        />
      )}
      {currentPage < totalPages && (
        <PaginationButton
          onClick={() => handleChangePage("next")}
          direction="next"
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "prev" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}

      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
