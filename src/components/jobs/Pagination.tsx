import { useState } from "react";

type PaginationProps = {
    totalPosts: number;
    postsPerPage: number;
    setCurrentPage: (page: number) => void;
};

const Pagination = ({totalPosts, postsPerPage, setCurrentPage,}: PaginationProps) => {
    const [currentPage, setCurrentPageState] = useState(1);

    const handleClick = (page: number) => {
        setCurrentPage(page);
        setCurrentPageState(page);
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className={"flex gap-2"}>
            {pages.map((page, index) => {
                return (
                    <button key={index} className={`${currentPage === page ? "blueButton" : "grayButton"}`}
                            onClick={() => handleClick(page)}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
