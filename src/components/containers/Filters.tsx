import { useState } from "react";
import LocationFilter from "../filters/LocationFilter.tsx";
import JobTypeFilter from "../filters/JobTypeFilter.tsx";
import CompanyFilter from "../filters/CompanyFilter.tsx";
import RemoteFilter from "../filters/RemoteFilter.tsx";
import IndustryFilter from "../filters/IndustryFilter.tsx";
import BenefitsFilter from "../filters/BenefitsFilter.tsx";

export default function Filters() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Sidebar for lg+ screens */}
            <div className="hidden lg:flex flex-col border-r border-gray-300 pr-4">
                <button role="button" className="ml-auto mb-2">
                    <p className="text-right text-placeholder font-semibold">Clear all filters</p>
                </button>
                <div className="flex flex-col gap-8">
                    <LocationFilter />
                    <JobTypeFilter />
                    <CompanyFilter />
                    <RemoteFilter />
                    <IndustryFilter />
                    <BenefitsFilter />
                </div>
            </div>

            {/* Burger icon for smaller screens */}
            <div className="lg:hidden">
                <button
                    role="button"
                    aria-label="Open filters"
                    onClick={toggleSidebar}
                    className="p-2 rounded-md focus:outline-none"
                >
                    <svg
                        className="w-12 h-12 text-gray-600 absolute -translate-x-4 -translate-y-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Sidebar overlay for smaller screens */}
            <div
                className={`fixed inset-0 z-50 flex lg:hidden bg-black bg-opacity-50 transition-transform duration-500 ease-in ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            >
                <div
                    className={`relative w-2/3 bg-white p-4 shadow-lg h-full overflow-y-auto transition-transform duration-500 ease-in transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        role="button"
                        aria-label="Close filters"
                        onClick={toggleSidebar}
                        className="absolute top-4 right-4 text-gray-600"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <button role="button" className="ml-auto mb-2">
                        <p className="text-right text-placeholder font-semibold">Clear all filters</p>
                    </button>
                    <div className="flex flex-col gap-8">
                        <LocationFilter />
                        <JobTypeFilter />
                        <CompanyFilter />
                        <RemoteFilter />
                        <IndustryFilter />
                        <BenefitsFilter />
                    </div>
                </div>
            </div>
        </>
    );
}