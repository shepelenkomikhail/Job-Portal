import vacancies from '../../storage/vacancies.json';
import { VacancyInterface } from '../../types/VacancyInterface';
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {gridVal, searchTermAtom} from "./JobsSearch";

export default function JobsList() {
    const [grid] = useAtom(gridVal);
    const [searchTerm] = useAtom(searchTermAtom);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage: 8 | 5 = grid ? 8 : 5;

    const filteredVacancies = vacancies.filter((vacancy: VacancyInterface) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
            vacancy.title.toLowerCase().includes(lowerSearch) ||
            vacancy.company.toLowerCase().includes(lowerSearch)
        );
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentVacancies = filteredVacancies.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredVacancies.length / postsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [filteredVacancies, currentPage, totalPages]);

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
                totalPages={totalPages}
            />
        </div>
    );
}