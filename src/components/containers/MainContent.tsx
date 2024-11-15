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
        <main className={"lg:grid lg:grid-cols-3 mx-12 mt-8"}>
            <Filters
                onLocationSelect={setSelectedLocations}
                onJobTypeSelect={setSelectedJobTypes}
                onCompanySelect={setSelectedCompanies}
                onRemoteSelect={setSelectedRemote}
                onIndustrySelect={setSelectedIndustries}
                onBenefitsSelect={setSelectedBenefits}
                setSearchTerm={setSearchTerm}
            />
            <JobsContainer
                selectedLocations={selectedLocations}
                selectedJobTypes={selectedJobTypes}
                selectedCompanies={selectedCompanies}
                selectedRemote={selectedRemote}
                selectedIndustries={selectedIndustries}
                selectedBenefits={selectedBenefits}
                searchTerm={searchTerm}
            />
        </main>
    );
}