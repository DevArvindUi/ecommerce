import React from "react";

const Pagination = ({ postPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination custom_pagination mt-5">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
            onClick={() => paginate(number)}
          >
            <p className="page-link">{number}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
