import {Vacancy} from "../../../types/Vacancy.ts";
import React, {useEffect, useState} from "react";
import GridCard from "./GridCard.tsx";
import ListCard from "./ListCard.tsx";
import VacancyDescription from "./VacancyDescription.tsx";
import BookmarkSvg from "../../svg/BookmarkSvg.tsx";

interface JobCardProps {
    vacancy: Vacancy;
    grid: boolean;
    fromSidebar?: boolean;
}

export default function JobCard({vacancy, grid, fromSidebar}: JobCardProps) {
    const [saved, setSaved] = useState(vacancy.saved);
    const [applied, setApplied] = useState(vacancy.applied);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const savedVacancies: string|null = localStorage.getItem("saved");
        const appliedVacancies: string|null = localStorage.getItem("applied");

        const savedList: Vacancy[] = savedVacancies ? JSON.parse(savedVacancies) : [];
        const appliedList: Vacancy[] = appliedVacancies ? JSON.parse(appliedVacancies) : [];

        setSaved(savedList.some((v: Vacancy) => v.id === vacancy.id));
        setApplied(appliedList.some((v: Vacancy) => v.id === vacancy.id));
    }, [vacancy.id]);

    const saveVacancy = (vacancy: Vacancy) => {
        const savedVacancies: string|null = localStorage.getItem("saved");
        let vacanciesList: Vacancy[] = savedVacancies ? JSON.parse(savedVacancies) : [];

        if (saved) {
            vacanciesList = vacanciesList.filter((v) => v.id !== vacancy.id);
        } else {
            vacanciesList.push(vacancy);
        }

        localStorage.setItem("saved", JSON.stringify(vacanciesList));
        setSaved((prevSaved) => !prevSaved);
    }

    const applyVacancy = (vacancy: Vacancy) => {
        const appliedVacancies: string|null = localStorage.getItem("applied");
        let vacanciesList: Vacancy[] = appliedVacancies ? JSON.parse(appliedVacancies) : [];

        if (applied) {
            vacanciesList = vacanciesList.filter((v) => v.id !== vacancy.id);
        } else {
            vacanciesList.push(vacancy);
        }

        localStorage.setItem("applied", JSON.stringify(vacanciesList));
        setApplied(true);
    }

    return (
        <div
            className={"border border-gray-400 rounded-xl p-4 transition-ease-in duration-300 hover:shadow-lg relative cursor-pointer"}
            style={{width: grid ? "300px" : "100%"}}
            role="region"
            aria-labelledby="vacancy-card"
            onClick={() =>{setShowDialog(true)}}
        >

            {/*Bookmark icon*/}
            <button
                className={`w-auto h-auto flex justify-center items-center rounded-full absolute top-0 right-0 ${!grid ? " -translate-x-1/4 translate-y-1/3": "translate-x-1/3 -translate-y-1/3"}`}
                role="button"
                aria-label="Save Vacancy"
                onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                    e.stopPropagation();
                    saveVacancy(vacancy);
                }}
            >
                <div className="flex justify-center items-center">
                    <BookmarkSvg saved={saved}/>
                </div>
            </button>

            {/*Top Matching Badge*/}
            {vacancy.relevancePoints >= 80 && (
                <div
                    className="absolute top-0 left-0 bg-green-200 border border-green-800 rounded-md transition-ease-in duration-300 p-1 w-auto h-auto -translate-x-3 -translate-y-4"
                    role="status"
                    aria-live="polite"
                    aria-label="Top Matching"
                >
                    <p className={"text-green-800 font-semibold text-sm"}>Top Matching!</p>
                </div>
            )}

            {/*Card itself*/}
            <div>
                {grid ? (
                    <GridCard vacancy={vacancy} applied={applied} applyVacancy={applyVacancy}/>
                ) : (
                    <ListCard vacancy={vacancy} applied={applied} applyVacancy={applyVacancy}/>
                )}
            </div>

            {/*Vacancy Description Dialog*/}
            {showDialog && (
                    <VacancyDescription vacancy={vacancy} applied={applied} saved={saved} fromSidebar={fromSidebar}
                                        applyVacancy={applyVacancy} saveVacancy={saveVacancy} setShowDialog={setShowDialog} />
            )}
        </div>
    );
}