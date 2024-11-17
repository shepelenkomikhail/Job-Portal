import { useState, useEffect } from "react";
import JobCard from "../jobs/jobCards/JobCard.tsx";
import { useMediaQuery } from "react-responsive";

export default function Header() {
    const [isSavedSidebarOpen, setIsSavedSidebarOpen] = useState(false);
    const [isAppliedSidebarOpen, setIsAppliedSidebarOpen] = useState(false);
    const [appliedVacancies, setAppliedVacancies] = useState([]);
    const [savedVacancies, setSavedVacancies] = useState([]);
    const isSmallScreen = useMediaQuery({ maxWidth: 640 });

    const toggleSavedSidebar = () => {
        setIsSavedSidebarOpen(!isSavedSidebarOpen);
    };

    const toggleAppliedSidebar = () => {
        setIsAppliedSidebarOpen(!isAppliedSidebarOpen);
    };

    useEffect(() => {
        const appliedData = JSON.parse(localStorage.getItem("applied") || "[]");
        const savedData = JSON.parse(localStorage.getItem("saved") || "[]");
        setAppliedVacancies(appliedData);
        setSavedVacancies(savedData);
    }, [localStorage.getItem("applied"), localStorage.getItem("saved")]);

    return (
        <>
            <header className="mx-6 mt-8 md:mx-12" role="banner" aria-label="Header">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-blue-950">Job Portal</h1>
                    <h1 className="hidden md:block text-4xl text-black">We have a job for you!</h1>
                    <div className="flex gap-3 md:gap-3">
                        <button
                            onClick={toggleAppliedSidebar}
                            aria-expanded={isAppliedSidebarOpen}
                            aria-controls="appliedSidebar"
                            aria-label="View applied jobs"
                            className="focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="40px"
                                viewBox="0 -960 960 960"
                                width="40px"
                                fill="#000000"
                                role="img"
                                aria-hidden="true"
                            >
                                <path d="m435.33-250 228-228L618-523.33l-183 183L338.33-437l-45 45 142 142ZM226.67-80q-27 0-46.84-19.83Q160-119.67 160-146.67v-666.66q0-27 19.83-46.84Q199.67-880 226.67-880H574l226 226v507.33q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm314-542.67v-190.66h-314v666.66h506.66v-476H540.67Zm-314-190.66v190.66-190.66 666.66-666.66Z" />
                            </svg>
                        </button>
                        <button
                            onClick={toggleSavedSidebar}
                            aria-expanded={isSavedSidebarOpen}
                            aria-controls="savedSidebar"
                            aria-label="View saved jobs"
                            className="focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="40px"
                                viewBox="0 -960 960 960"
                                width="40px"
                                fill="#000000"
                                role="img"
                                aria-hidden="true"
                            >
                                <path d="M200-120v-656.67q0-27 19.83-46.83 19.84-19.83 46.84-19.83h426.66q27 0 46.84 19.83Q760-803.67 760-776.67V-120L480-240 200-120Zm66.67-101.33L480-312l213.33 90.67v-555.34H266.67v555.34Zm0-555.34h426.66-426.66Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <hr className="mt-4 h-0.5 border-gray-300 md:mt-6" />
            </header>

            <div
                id="appliedSidebar"
                role="dialog"
                aria-labelledby="appliedJobsHeading"
                aria-hidden={!isAppliedSidebarOpen}
                className={`fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50 transition-opacity ${
                    isAppliedSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={toggleAppliedSidebar}
            >
                <div
                    className={`relative w-full md:w-2/3 xl:w-1/2 bg-white h-full shadow-lg overflow-y-auto transition-transform transform ${
                        isAppliedSidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                    role="document"
                >
                    <button
                        aria-label="Close applied sidebar"
                        onClick={toggleAppliedSidebar}
                        className="absolute top-4 right-4 text-gray-600"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 id="appliedJobsHeading" className="sr-only">
                        Applied Jobs
                    </h2>
                    <div className="p-4 mt-12">
                        <div className="flex flex-col items-center gap-8">
                            {appliedVacancies.length > 0 ? (
                                appliedVacancies.map((vacancy, index) => (
                                    <JobCard key={index} vacancy={vacancy} grid={isSmallScreen} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500 mt-10">
                                    There are no applied vacancies yet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="savedSidebar"
                role="dialog"
                aria-labelledby="savedJobsHeading"
                aria-hidden={!isSavedSidebarOpen}
                className={`fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50 transition-opacity ${
                    isSavedSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={toggleSavedSidebar}
            >
                <div
                    className={`relative w-full md:w-2/3 xl:w-1/2 bg-white h-full shadow-lg overflow-y-auto transition-transform transform ${
                        isSavedSidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                    role="document"
                >
                    <button
                        aria-label="Close saved sidebar"
                        onClick={toggleSavedSidebar}
                        className="absolute top-4 right-4 text-gray-600"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 id="savedJobsHeading" className="sr-only">
                        Saved Jobs
                    </h2>
                    <div className="p-4 mt-12">
                        <div className="flex flex-col items-center gap-8">
                            {savedVacancies.length > 0 ? (
                                savedVacancies.map((vacancy, index) => (
                                    <JobCard key={index} vacancy={vacancy} grid={isSmallScreen} fromSidebar={true}/>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 mt-10">
                                    There are no saved vacancies yet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
