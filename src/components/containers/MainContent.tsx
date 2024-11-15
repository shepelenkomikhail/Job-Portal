import Filters from "./Filters.tsx";
import JobsContainer from "./JobsContainer.tsx";
import {useState} from "react";

export default function MainContent(){
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedRemote, setSelectedRemote] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    return(
        <main
            className="lg:grid lg:grid-cols-3 lg:mx-12 lg:mt-8 2xl:grid-cols-4"
            role="main"
            aria-labelledby="main-content-title"
        >
            <h1 id="main-content-title" className="sr-only">Main Content</h1>
            <Filters
                aria-labelledby="filters-title"
                onLocationSelect={setSelectedLocations}
                onJobTypeSelect={setSelectedJobTypes}
                onCompanySelect={setSelectedCompanies}
                onRemoteSelect={setSelectedRemote}
                onIndustrySelect={setSelectedIndustries}
                onBenefitsSelect={setSelectedBenefits}
                setSearchTerm={setSearchTerm}
            />
            <div
                className="lg:col-span-2 2xl:col-span-3 flex justify-center"
                role="region"
                aria-labelledby="jobs-region-title"
            >
                <h2 id="jobs-region-title" className="sr-only">Jobs Container</h2>
                <JobsContainer
                    selectedLocations={selectedLocations}
                    selectedJobTypes={selectedJobTypes}
                    selectedCompanies={selectedCompanies}
                    selectedRemote={selectedRemote}
                    selectedIndustries={selectedIndustries}
                    selectedBenefits={selectedBenefits}
                    searchTerm={searchTerm}
                />
            </div>
        </main>
    );
}
