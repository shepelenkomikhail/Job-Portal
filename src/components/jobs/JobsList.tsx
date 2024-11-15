import vacancies from '../../storage/vacancies.json';
import { VacancyInterface } from '../../types/VacancyInterface';
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import { useAtom } from "jotai/index";
import { gridVal, searchTermAtom } from "./JobsSearch";

export default function JobsList({
                                     selectedIndustries,
                                     selectedJobTypes,
                                     selectedCompanies,
                                     selectedLocations,
                                     selectedRemote,
                                     selectedBenefits,
                                     searchTerm,
                                 }: {
    selectedIndustries: string[];
    selectedJobTypes: string[];
    selectedCompanies: string[];
    selectedLocations: string[];
    selectedRemote: string[];
    selectedBenefits: string[];
    searchTerm: string;
}) {
    const [grid] = useAtom(gridVal);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage: 8 | 5 = grid ? 8 : 5;

    const filteredVacancies = vacancies.filter((vacancy: VacancyInterface) => {
        const lowerSearch = searchTerm.toLowerCase();

        const matchesSearchTerm =
            vacancy.title.toLowerCase().includes(lowerSearch) ||
            vacancy.company.toLowerCase().includes(lowerSearch);

        const matchesIndustry =
            selectedIndustries.length === 0 || selectedIndustries.includes(vacancy.industry);

        const matchesJobType =
            selectedJobTypes.length === 0 || selectedJobTypes.includes(vacancy.jobType);

        const matchesCompany =
            selectedCompanies.length === 0 || selectedCompanies.includes(vacancy.company);

        const matchesLocation =
            selectedLocations.length === 0 || selectedLocations.some(location =>
                vacancy.location.toLowerCase().includes(location.toLowerCase())
            );

        const matchesRemote =
            selectedRemote.length === 0 || selectedRemote.includes(vacancy.remote);

        const matchesBenefits =
            selectedBenefits.length === 0 || selectedBenefits.every(benefit => {
                if (vacancy.benefits) {
                    vacancy.benefits.includes(benefit)
                } else {
                    return false;
                }
            });

        return (
            searchTermAtom &&
            matchesSearchTerm &&
            matchesIndustry &&
            matchesJobType &&
            matchesCompany &&
            matchesLocation &&
            matchesRemote &&
            matchesBenefits
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
                totalPosts={filteredVacancies.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </div>
    );
}
