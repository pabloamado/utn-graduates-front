import React from 'react';
import './Pagination.css'

function Pagination({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = [];
    for (let i = 0; i < totalPages; i++) {
        pages.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => onPageChange(i)}>{i + 1}</button>
            </li>
        );
    }

    return (
        <nav>
            <ul className="pagination">
                {pages}
            </ul>
        </nav>
    );
}

export default Pagination;