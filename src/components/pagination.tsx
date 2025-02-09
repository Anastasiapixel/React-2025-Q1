export interface PaginationType {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  currentPageNumber: () => void;
  currentPage: number;
}

export const Pagination = ({
  handleNextClick,
  handlePrevClick,
  currentPage,
}: PaginationType) => {
  return (
    <div className="pagination">
      <button onClick={handlePrevClick}>Previous</button>
      <span>{currentPage}</span>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
