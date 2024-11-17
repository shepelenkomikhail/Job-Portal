import { useState } from "react";
import LocationFilter from "../filters/LocationFilter.tsx";
import JobTypeFilter from "../filters/JobTypeFilter.tsx";
import CompanyFilter from "../filters/CompanyFilter.tsx";
import RemoteFilter from "../filters/RemoteFilter.tsx";
import IndustryFilter from "../filters/IndustryFilter.tsx";
import BenefitsFilter from "../filters/BenefitsFilter.tsx";

interface FiltersProps {
    onLocationSelect: (locations: string[]) => void;
    onJobTypeSelect: (jobTypes: string[]) => void;
    onCompanySelect: (companies: string[]) => void;
    onRemoteSelect: (remote: string[]) => void;
    onIndustrySelect: (industries: string[]) => void;
    onBenefitsSelect: (benefits: string[]) => void;
    setSearchTerm: (term: string) => void;
}

export default function Filters({ onLocationSelect, onJobTypeSelect, onCompanySelect, onRemoteSelect, onIndustrySelect, onBenefitsSelect, setSearchTerm, }: FiltersProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [resetFilters, setResetFilters] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClearFilters = () => {
        onLocationSelect([]);
        onJobTypeSelect([]);
        onCompanySelect([]);
        onIndustrySelect([]);
        onRemoteSelect([]);
        onBenefitsSelect([]);
        setSearchTerm("");
        setResetFilters(true);
        setTimeout(() => setResetFilters(false), 0);
    };

    return (
        <>
            <div className="flex hidden flex-col border-r border-gray-300 pr-4 lg:flex" role="complementary" aria-label="Filter sidebar">
                <button
                    role="button"
                    aria-label="Clear all filters"
                    className="mb-2 ml-auto"
                    onClick={handleClearFilters}
                >
                    <p className="font-semibold text-placeholder text-right hover:text-gray-700">
                        Clear all filters
                    </p>
                </button>
                <div className="flex flex-col gap-8">
                    <LocationFilter onLocationSelect={onLocationSelect} reset={resetFilters} />
                    <JobTypeFilter onJobTypeSelect={onJobTypeSelect} reset={resetFilters} />
                    <CompanyFilter onCompanySelect={onCompanySelect} reset={resetFilters} />
                    <RemoteFilter onRemoteSelect={onRemoteSelect} reset={resetFilters} />
                    <IndustryFilter onIndustrySelect={onIndustrySelect} reset={resetFilters} />
                    <BenefitsFilter onBenefitsSelect={onBenefitsSelect} reset={resetFilters} />
                </div>
            </div>

            <div className="lg:hidden" role="dialog" aria-modal="true">
                <button
                    role="button"
                    aria-label="Open filters"
                    onClick={toggleSidebar}
                    className="rounded-md p-2 focus:outline-none"
                >
                    <svg
                        className="absolute mt-1 ml-3 h-12 w-12 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={`fixed inset-0 z-50 flex bg-black bg-opacity-50 transition-transform duration-500 ease-in ${isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"} lg:hidden`}
                onClick={toggleSidebar}
                role="dialog"
                aria-label="Mobile filter sidebar"
            >
                <div
                    className={`relative h-full w-2/3 transform overflow-y-auto bg-white p-4 shadow-lg transition-transform duration-500 ease-in ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                    aria-labelledby="filter-sidebar-title"
                >
                    <button
                        role="button"
                        aria-label="Close filters"
                        onClick={toggleSidebar}
                        className="absolute right-4 top-4 text-gray-600"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <button role="button" aria-label="Clear all filters" className="mb-2 ml-auto" onClick={handleClearFilters}>
                        <p className="font-semibold text-placeholder text-right">Clear all filters</p>
                    </button>
                    <div className="flex flex-col gap-8">
                        <LocationFilter onLocationSelect={onLocationSelect} reset={resetFilters} />
                        <JobTypeFilter onJobTypeSelect={onJobTypeSelect} reset={resetFilters} />
                        <CompanyFilter onCompanySelect={onCompanySelect} reset={resetFilters} />
                        <RemoteFilter onRemoteSelect={onRemoteSelect} reset={resetFilters} />
                        <IndustryFilter onIndustrySelect={onIndustrySelect} reset={resetFilters} />
                        <BenefitsFilter onBenefitsSelect={onBenefitsSelect} reset={resetFilters} />
                    </div>
                    <button className="grayButton mt-2 w-full" onClick={toggleSidebar} aria-label="SearchSvg filters">SearchSvg</button>
                </div>
            </div>
        </>
    );
}
