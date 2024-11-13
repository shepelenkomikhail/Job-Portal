import vacancies from '../../storage/vacancies.json';
import { VacancyInterface } from '../../types/VacancyInterface.tsx';
import JobCard from "./JobCard.tsx";
import { useEffect, useState } from "react";
import Pagination from "./Pagination.tsx";

export default function JobsList() {
    const [grid, setGrid] = useState<boolean>(localStorage.getItem("grid") === "true");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    useEffect(() => {
        const gridSetting = localStorage.getItem("grid");
        if (gridSetting !== null) {
            setGrid(gridSetting === "true");
        }
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentVacancies = vacancies.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className={"flex flex-col items-center justify-center"}>
            <div
                className={`gap-8 m-6 flex ${grid ? "flex-wrap flex-row" : "flex-col"}`}
            >
                {currentVacancies.map((vacancy: VacancyInterface, index: number) => (
                    <JobCard key={index} vacancy={{ ...vacancy }} grid={grid} />
                ))}
            </div>
            <Pagination
                totalPosts={vacancies.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
