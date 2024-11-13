import LocationFilter from "../filters/LocationFilter.tsx";
import JobTypeFilter from "../filters/JobTypeFilter.tsx";
import CompanyFilter from "../filters/CompanyFilter.tsx";
import RemoteFilter from "../filters/RemoteFilter.tsx";
import IndustryFilter from "../filters/IndustryFilter.tsx";
import BenefitsFilter from "../filters/BenefitsFilter.tsx";

export default function Filters() {
    return (
        <div className="flex flex-col border-r border-gray-300 pr-4">
            <button role="button" className="ml-auto mb-2">
                <p className="text-right text-placeholder font-semibold">Clear all filters</p>
            </button>

            <div className={"flex flex-col gap-8"}>
                <LocationFilter />
                <JobTypeFilter />
                <CompanyFilter />
                <RemoteFilter />
                <IndustryFilter />
                <BenefitsFilter />
            </div>

        </div>
    );
}
