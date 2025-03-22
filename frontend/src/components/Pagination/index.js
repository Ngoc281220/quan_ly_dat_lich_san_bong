import React from "react";

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.total === 0) return null;

  const { currentPage, lastPage } = pagination;

  return (
    <div className="pagination text-end">
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="btn btn-outline-primary"
      >
        Prev
      </button>

      {/* Nút số trang */}
      {[...Array(lastPage)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`btn mx-1 ${currentPage === page ? "active" : "btn-outline-primary"}`}
          >
            {page}
          </button>
        );
      })}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
        disabled={currentPage === lastPage}
        className="btn btn-outline-primary"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
