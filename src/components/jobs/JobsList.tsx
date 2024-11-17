import { useAtom } from "jotai/index";
import { searchTermAtom, relevanceAtom, dateAtom, gridVal } from "../../types/atoms.ts";
import vacancies from "../../storage/vacancies.json";
import { Vacancy } from "../../types/Vacancy.ts";
import JobCard from "./jobCards/JobCard.tsx";
import Pagination from "./Pagination";
import React, {useEffect, useMemo, useState} from "react";

interface JobsListProps {
    selectedIndustries: string[],
    selectedJobTypes: string[],
    selectedCompanies: string[],
    selectedLocations: string[],
    selectedRemote: string[],
    selectedBenefits: string[],
    searchTerm?: string,
}

export default function JobsList({selectedIndustries, selectedJobTypes, selectedCompanies, selectedLocations,
                                     selectedRemote, selectedBenefits,}: JobsListProps) {

    const [grid] = useAtom(gridVal);
    const [searchTermA] = useAtom(searchTermAtom);
    const [selectedRelevanceOption] = useAtom(relevanceAtom);
    const [selectedDateOption] = useAtom(dateAtom);

    const [currentVacancies, setVacancies] = useState<Vacancy[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage: 8 | 5 = grid ? 8 : 5;

    const filteredVacancies: Vacancy[] = useMemo((): Vacancy[] => {
        const lowerSearch: string = searchTermA.toLowerCase();
        return vacancies.filter((vacancy: Vacancy): boolean => {
            const matchesSearchTerm: boolean =
                vacancy.title.toLowerCase().includes(lowerSearch) ||
                vacancy.company.toLowerCase().includes(lowerSearch);
            const matchesIndustry: boolean =
                selectedIndustries.length === 0 || selectedIndustries.includes(vacancy.industry);
            const matchesJobType: boolean =
                selectedJobTypes.length === 0 || selectedJobTypes.includes(vacancy.jobType);
            const matchesCompany: boolean =
                selectedCompanies.length === 0 || selectedCompanies.includes(vacancy.company);
            const matchesLocation: boolean =
                selectedLocations.length === 0 || selectedLocations.some(location =>
                    vacancy.location.toLowerCase().includes(location.toLowerCase())
                );
            const matchesRemote: boolean =
                selectedRemote.length === 0 || selectedRemote.includes(vacancy.remote);
            const matchesBenefits: boolean =
                selectedBenefits.length === 0 || selectedBenefits.every(benefit => {
                    if (vacancy.benefits) {
                        return vacancy.benefits.includes(benefit);
                    }
                    return false;
                });
            return (matchesSearchTerm && matchesIndustry && matchesJobType && matchesCompany &&
                matchesLocation && matchesRemote && matchesBenefits);
        });
    }, [searchTermA, selectedIndustries, selectedJobTypes, selectedCompanies, selectedLocations, selectedRemote, selectedBenefits]);

    const sortedVacancies: Vacancy[] = useMemo((): Vacancy[] => {
        if (selectedRelevanceOption) {
            return [...filteredVacancies].sort((a, b) => b.relevancePoints - a.relevancePoints);
        }
        if (selectedDateOption) {
            return [...filteredVacancies].sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
        }
        return filteredVacancies;
    }, [filteredVacancies, selectedRelevanceOption, selectedDateOption]);


    const indexOfLastPost: number = currentPage * postsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
    const totalPages: number = Math.ceil(filteredVacancies.length / postsPerPage);

    useEffect(() => {
        setVacancies(sortedVacancies.slice(indexOfFirstPost, indexOfLastPost));
    }, [sortedVacancies, indexOfFirstPost, indexOfLastPost, filteredVacancies]);

    useEffect((): void => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages > 0 ? totalPages : 1);
        }
    }, [totalPages, currentPage]);

    return (
        <div className="flex flex-col items-center justify-center mt-8"
             role="region"
             aria-labelledby="jobs-list"
        >
            <div className={`gap-8 m-6 lg:mb-12 w-10/12 flex 
                 ${grid ? "flex-wrap flex-row items-center justify-center xl:gap-12 w-full" : "flex-col"}`}
                 role="list"
            >
                {currentVacancies.map((vacancy: Vacancy, index: number): React.ReactNode => (
                    <JobCard key={index} vacancy={vacancy} grid={grid} />
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
