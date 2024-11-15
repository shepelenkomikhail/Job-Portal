import {useState} from "react";

type PaginationProps = {
    totalPosts: number;
    postsPerPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
};

const Pagination = ({ setCurrentPage, totalPages }: PaginationProps) => {
    const [currentPage, setCurrentPageState] = useState(1);

    const handleClick = (page: number) => {
        setCurrentPage(page);
        setCurrentPageState(page);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handleClick(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handleClick(currentPage + 1);
        }
    };

    const getPageRange = () => {
        const range: any[] = [];
        const maxVisiblePages = 5;

        const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const end = Math.min(totalPages, start + maxVisiblePages - 1);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (start > 1) range.unshift("...");
        if (end < totalPages) range.push("...");

        return range;
    };

    const pages = getPageRange();

    return (
        <div className="flex gap-2">
            <button onClick={handlePrevious} disabled={currentPage === 1} className="px-2 py-1 border rounded hover:bg-gray-200">
                &lt;
            </button>

            {pages.map((page, index) => {
                if (page === "...") {
                    return (<span key={index} className="px-2 py-1">...</span>);
                } else {
                    return (
                        <button key={index} onClick={() => handleClick(page as number)}
                            className={`px-2 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                            {page}
                        </button>
                    );
                }
            })}

            <button onClick={handleNext} disabled={currentPage === totalPages} className="px-2 py-1 border rounded hover:bg-gray-200">
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
