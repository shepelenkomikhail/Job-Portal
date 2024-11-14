import vacancies from '../../storage/vacancies.json';
import { VacancyInterface } from '../../types/VacancyInterface';
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import {useState } from "react";
import {useAtom} from "jotai/index";
import {gridVal} from "./JobsSearch";

export default function JobsList() {
    const [grid] = useAtom(gridVal);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage: 8|5 = grid ? 8 : 5;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentVacancies = vacancies.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`gap-8 m-6 w-10/12 flex ${grid ? "flex-wrap flex-row" : "flex-col"}`}>
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