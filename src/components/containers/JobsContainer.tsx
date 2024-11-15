import JobsSearch from "../jobs/JobsSearch.tsx";
import JobsList from "../jobs/JobsList.tsx";

export default function JobsContainer({
                                          selectedLocations,
                                          selectedJobTypes,
                                          selectedCompanies,
                                          selectedRemote,
                                          selectedIndustries,
                                          selectedBenefits,
                                          searchTerm,
                                      }: {
    selectedLocations: string[];
    selectedJobTypes: string[];
    selectedCompanies: string[];
    selectedRemote: string[];
    selectedIndustries: string[];
    selectedBenefits: string[];
    searchTerm: string;
}) {
    return (
        <div className={"col-span-2 ml-2"}>
            <JobsSearch />
            <JobsList
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
