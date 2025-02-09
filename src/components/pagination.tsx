export interface PaginationType {
  handleNextClick: () => void;
  handlePrevClick: () => void;
}

export const Pagination = ({
  handleNextClick,
  handlePrevClick,
}: PaginationType) => {
  return (
    <div className="pagination">
      <button onClick={handlePrevClick}>Previous</button>
      <span>1</span>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
