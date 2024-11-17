import React, { useState, useEffect } from "react";
import JobCard from "../jobs/jobCards/JobCard.tsx";
import { useMediaQuery } from "react-responsive";
import {Vacancy} from "../../types/Vacancy.ts";
import AppliedSvg from "../svg/AppliedSvg.tsx";
import BookmarkHeaderSvg from "../svg/BookmarkHeaderSvg.tsx";
import CrossHeaderSidebarsSvg from "../svg/CrosHeaderSidebarsSvg.tsx";

export default function Header() {
    const [isSavedSidebarOpen, setIsSavedSidebarOpen] = useState(false);
    const [isAppliedSidebarOpen, setIsAppliedSidebarOpen] = useState(false);
    const [appliedVacancies, setAppliedVacancies] = useState<Vacancy[]>([]);
    const [savedVacancies, setSavedVacancies] = useState<Vacancy[]>([]);
    const isSmallScreen: boolean = useMediaQuery({ maxWidth: 640 });

    const toggleSavedSidebar: ()=>void = (): void => {
        setIsSavedSidebarOpen(!isSavedSidebarOpen);
    };

    const toggleAppliedSidebar: ()=>void = (): void => {
        setIsAppliedSidebarOpen(!isAppliedSidebarOpen);
    };

    const savedItems: Vacancy[] = JSON.parse(localStorage.getItem("saved") || "[]");
    const appliedItems: Vacancy[] = JSON.parse(localStorage.getItem("applied") || "[]");

    useEffect((): void => {
        const appliedData: Vacancy[] = JSON.parse(localStorage.getItem("applied") || "[]");
        const savedData: Vacancy[] = JSON.parse(localStorage.getItem("saved") || "[]");
        setAppliedVacancies(appliedData);
        setSavedVacancies(savedData);
    }, [savedItems, appliedItems]);

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
                            <AppliedSvg/>
                        </button>
                        <button
                            onClick={toggleSavedSidebar}
                            aria-expanded={isSavedSidebarOpen}
                            aria-controls="savedSidebar"
                            aria-label="View saved jobs"
                            className="focus:outline-none"
                        >
                            <BookmarkHeaderSvg/>
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
                className={`fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50 transition-opacity 
                ${isAppliedSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={toggleAppliedSidebar}
            >
                <div
                    className={`relative w-full md:w-2/3 xl:w-1/2 bg-white h-full shadow-lg overflow-y-auto transition-transform transform 
                                ${isAppliedSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                    role="document"
                >
                    <button
                        aria-label="Close applied sidebar"
                        onClick={toggleAppliedSidebar}
                        className="absolute top-4 right-4 text-gray-600"
                    >
                        <CrossHeaderSidebarsSvg/>
                    </button>

                    <h2 id="appliedJobsHeading" className="sr-only">Applied Jobs</h2>

                    <div className="p-4 mt-12">
                        <div className="flex flex-col items-center gap-8">
                            {appliedVacancies.length > 0 ? (
                                appliedVacancies.map((vacancy: Vacancy, index: number): React.ReactNode => (
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
                className={`fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50 transition-opacity 
                ${isSavedSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={toggleSavedSidebar}
            >
                <div
                    className={`relative w-full md:w-2/3 xl:w-1/2 bg-white h-full shadow-lg overflow-y-auto transition-transform transform ${
                        isSavedSidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                    role="document"
                >
                    <button
                        aria-label="Close saved sidebar"
                        onClick={toggleSavedSidebar}
                        className="absolute top-4 right-4 text-gray-600"
                    >
                        <CrossHeaderSidebarsSvg/>
                    </button>
                    <h2 id="savedJobsHeading" className="sr-only">Saved Jobs</h2>
                    <div className="p-4 mt-12">
                        <div className="flex flex-col items-center gap-8">
                            {savedVacancies.length > 0 ? (
                                savedVacancies.map((vacancy: Vacancy, index: number): React.ReactNode => (
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
