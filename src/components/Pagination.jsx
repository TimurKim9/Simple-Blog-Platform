function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      {Array.from(
        { length: Math.min(totalPages, 7) },
        (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              className={page === pageNumber ? 'active' : ''}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }
      )}
    </div>
  );
}

export default Pagination;
