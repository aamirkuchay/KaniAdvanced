import React from 'react';
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 4) {
            // Display all pages if totalPages is 4 or less
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always display the first page
            pageNumbers.push(1);

            // Display pages around the current page
            if (currentPage > 2) {
                if (currentPage > 3) {
                    pageNumbers.push("...");
                }
                pageNumbers.push(currentPage - 1);
            }

            if (currentPage !== 1 && currentPage !== totalPages) {
                pageNumbers.push(currentPage);
            }

            if (currentPage < totalPages - 1) {
                pageNumbers.push(currentPage + 1);
                if (currentPage < totalPages - 2) {
                    pageNumbers.push("...");
                }
            }

            // Always display the last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex -space-x-px py-5 gap-1">
                {currentPage > 1 && (
                    <li>
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-2 py-3 border border-gray-300 rounded hover:bg-slate-800"
                        >
                            <TbPlayerTrackPrev />
                        </button>
                    </li>
                )}
                {renderPageNumbers().map((number, index) => (
                    <li key={index}>
                        {number === "..." ? (
                            <span className="px-3 py-2 border border-transparent">...</span>
                        ) : (
                            <button
                                type="button"
                                onClick={() => handlePageChange(number)}
                                className={`px-3 py-2 border border-gray-300 rounded ${number === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-slate-800'}`}
                            >
                                {number}
                            </button>
                        )}
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li>
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-2 py-3 border border-gray-300 rounded hover:bg-slate-800"
                        >
                            <TbPlayerTrackNext />
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
