import LocationFilter from "../filters/LocationFilter.tsx";
import JobTypeFilter from "../filters/JobTypeFilter.tsx";
import CompanyFilter from "../filters/CompanyFilter.tsx";
import RemoteFilter from "../filters/RemoteFilter.tsx";
import IndustryFilter from "../filters/IndustryFilter.tsx";
import BenefitsFilter from "../filters/BenefitsFilter.tsx";

export default function Filters() {
    return (
        <div className="flex flex-col border-r-2 border-gray-400 bg-buttonviolet">
            <button role="button" className="ml-auto mr-3">
                <p className="text-right">Clear all filters</p>
            </button>

            <LocationFilter />
            <JobTypeFilter />
            <CompanyFilter />
            <RemoteFilter />
            <IndustryFilter />
            <BenefitsFilter />
        </div>
    );
}
