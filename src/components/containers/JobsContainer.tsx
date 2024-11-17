import JobsSearch from "../jobs/JobsSearch.tsx";
import JobsList from "../jobs/JobsList.tsx";

interface JobsContainerProps {
    selectedLocations: string[];
    selectedJobTypes: string[];
    selectedCompanies: string[];
    selectedRemote: string[];
    selectedIndustries: string[];
    selectedBenefits: string[];
    searchTerm?: string;
}

export default function JobsContainer({selectedLocations, selectedJobTypes, selectedCompanies, selectedRemote,
                                          selectedIndustries, selectedBenefits, searchTerm}: JobsContainerProps){
    return (
        <div
            className="flex flex-col w-full lg:col-span-2 lg:ml-2 2xl:grid-col-span-3"
            role="region"
            aria-labelledby="jobs-container-title"
        >
            <h2 id="jobs-container-title" className="sr-only">Jobs Container</h2>
            <JobsSearch aria-label="Job SearchSvg"/>
            <JobsList
                aria-labelledby="jobs-list-title"
                selectedLocations={selectedLocations}
                selectedJobTypes={selectedJobTypes}
                selectedCompanies={selectedCompanies}
                selectedRemote={selectedRemote}
                selectedIndustries={selectedIndustries}
                selectedBenefits={selectedBenefits}
                searchTerm={searchTerm}
            />
        </div>
    );
}
