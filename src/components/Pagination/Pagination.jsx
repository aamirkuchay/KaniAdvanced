import React from 'react';
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

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
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            type="button"
                            onClick={() => handlePageChange(number)}
                            className={`px-3 py-2 border border-gray-300 rounded ${number === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-slate-800'}`}
                        >
                            {number}
                        </button>
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
