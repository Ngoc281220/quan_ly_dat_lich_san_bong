const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.total === 0) return null;

  const { currentPage, lastPage } = pagination;
  const pageNeighbours = 1; // số trang hiển thị xung quanh trang hiện tại
  const totalNumbers = pageNeighbours * 2 + 1; // tổng số nút trang hiển thị

  const generatePageNumbers = () => {
    const pages = [];

    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(lastPage, currentPage + pageNeighbours);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < lastPage) {
      if (endPage < lastPage - 1) pages.push('...');
      pages.push(lastPage);
    }

    return pages;
  };

  return (
    <div className="pagination text-end mt-3">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-outline-primary"
      >
        Prev
      </button>

      {/* Page numbers */}
      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`btn ${
            page === currentPage ? 'btn-primary active' : 'btn-outline-primary'
          }`}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="btn btn-outline-primary"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
