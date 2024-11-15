import { useAtom } from "jotai/index";
import { searchTermAtom, relevanceAtom, dateAtom, gridVal } from "./JobsSearch";
import vacancies from "../../storage/vacancies.json";
import { VacancyInterface } from "../../types/VacancyInterface";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";

interface JobsListProps {
    selectedIndustries: string[],
    selectedJobTypes: string[],
    selectedCompanies: string[],
    selectedLocations: string[],
    selectedRemote: string[],
    selectedBenefits: string[],
    searchTerm?: string,
}

export default function JobsList({
                                     selectedIndustries,
                                     selectedJobTypes,
                                     selectedCompanies,
                                     selectedLocations,
                                     selectedRemote,
                                     selectedBenefits,
                                 }: JobsListProps) {
    const [grid] = useAtom(gridVal);
    const [searchTermA] = useAtom(searchTermAtom);
    const [selectedRelevanceOption] = useAtom(relevanceAtom);
    const [selectedDateOption] = useAtom(dateAtom);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage: 8 | 5 = grid ? 8 : 5;

    const filteredVacancies = vacancies.filter((vacancy: VacancyInterface) => {
        const lowerSearch = searchTermA.toLowerCase();

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
                    return vacancy.benefits.includes(benefit);
                }
                return false;
            });

        return (matchesSearchTerm && matchesIndustry && matchesJobType && matchesCompany && matchesLocation && matchesRemote && matchesBenefits);
    });

    const sortedVacancies: VacancyInterface[] = filteredVacancies.sort((a: VacancyInterface, b: VacancyInterface) => {
        if (selectedRelevanceOption) {
            return b.relevancePoints - a.relevancePoints;
        } else if (selectedDateOption) {
            return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
        }
        return filteredVacancies;
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentVacancies = sortedVacancies.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredVacancies.length / postsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    return (
        <div className="flex flex-col items-center justify-center mt-8" role="region" aria-labelledby="jobs-list">
            <div className={`gap-8 m-6 lg:mb-12 w-10/12 flex ${grid ? "flex-wrap flex-row items-center justify-center xl:gap-12 w-full" : "flex-col"}`} role="list">
                {currentVacancies.map((vacancy, index) => (
                    <JobCard key={index} vacancy={vacancy} grid={grid} role="listitem"/>
                ))}
            </div>
            <Pagination
                totalPosts={filteredVacancies.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                aria-label="Pagination Navigation"
            />
        </div>
    );
}
