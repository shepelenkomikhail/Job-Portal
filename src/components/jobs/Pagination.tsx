import React, {useState} from "react";

type PaginationProps = {
    totalPosts: number;
    postsPerPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
};

type PaginationItem = number | "...";

const Pagination = ({ setCurrentPage, totalPages }: PaginationProps) => {
    const [currentPage, setCurrentPageState] = useState(1);

    const handleClick: (page: number) => void  = (page: number): void => {
        setCurrentPage(page);
        setCurrentPageState(page);
    };

    const handlePrevious: ()=>void = (): void => {
        if (currentPage > 1) {
            handleClick(currentPage - 1);
        }
    };

    const handleNext: ()=>void = (): void => {
        if (currentPage < totalPages) {
            handleClick(currentPage + 1);
        }
    };

    const getPageRange: ()=>PaginationItem[] = (): PaginationItem[] => {
        const range: PaginationItem[] = [];
        const maxVisiblePages = 5;

        const start: number = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const end: number = Math.min(totalPages, start + maxVisiblePages - 1);

        for (let i: number = start; i <= end; i++) {range.push(i);}

        if (start > 1) range.unshift("...");
        if (end < totalPages) range.push("...");

        return range;
    };

    const pages: PaginationItem[] = getPageRange();

    return (
        <div className="flex gap-2" role="navigation" aria-label="Pagination">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded hover:bg-gray-300"
                aria-label="Previous page"
                aria-disabled={currentPage === 1 ? "true" : "false"}
            >
                &lt;
            </button>

            {pages.map((page: PaginationItem, index: number): React.ReactNode => {
                if (page === "...") {
                    return (
                        <span key={index} className="px-2 py-1" aria-hidden="true">...</span>
                    );
                } else {
                    return (
                        <button
                            key={index}
                            onClick={(): void => handleClick(page as number)}
                            className={`px-4 py-2 border rounded 
                                        ${currentPage === page ? "bg-blue-600 text-white" : "border-gray-300"}`}
                            aria-current={currentPage === page ? "page" : undefined}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    );
                }
            })}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded hover:bg-gray-300"
                aria-label="Next page"
                aria-disabled={currentPage === totalPages ? "true" : "false"}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
