import {Vacancy} from "../../../types/Vacancy.ts";
import React from "react";
import AppliedBox from "../../styledElements/AppliedBox.tsx";

interface VacancyDescriptionProps {
    vacancy: Vacancy;
    applied: boolean;
    saved: boolean;
    fromSidebar?: boolean;
    applyVacancy: (vacancy: Vacancy) => void;
    saveVacancy: (vacancy: Vacancy) => void;
    setShowDialog: (showDialog: boolean) => void;
}

export default function VacancyDescription({ vacancy, applied, saved, fromSidebar,
                                               applyVacancy ,saveVacancy, setShowDialog }: VacancyDescriptionProps) {
    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scrolls`}
            onClick={(): void => setShowDialog(false)}
        >
            <div
                className={`bg-white p-6 rounded-xl shadow-lg h-3/4 md:h-auto cursor-auto overflow-y-scroll relative
                            ${fromSidebar ? "w-full" : "w-11/12 md:w-2/3 lg:w-1/2"} `}
                onClick={(e: React.MouseEvent<HTMLDivElement>): void => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-gray-700 hover:text-black"
                    onClick={():void => setShowDialog(false)}
                >
                    <p className={"text-2xl"}>✖</p>
                </button>

                <h2 className="font-bold text-3xl mb-4 text-center">{vacancy.title}</h2>

                <div className="flex flex-col gap-6">
                    <div>
                        <img
                            src={vacancy.companyLogo}
                            alt={`Logo of ${vacancy.company}`}
                            className="w-24 h-24 md:w-32 md:h-32 m-1 mr-2 md:m-4 m rounded-lg object-cover self-start float-start"
                        />
                        {/* Assume that here is a description vacancy.jobDescription*/}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem
                            ipsum dolor sit amet, consectetur
                            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud
                            exercitation ullamco laboris.
                        </p>
                    </div>
                    <div className={"flex flex-col md:justify-between mr-4"}>
                        <div className="mb-4">
                            <strong>Benefits:</strong>{" "}
                            {vacancy.benefits && vacancy.benefits.length > 0 ? (
                                <ul className="list-disc ml-5">
                                    {vacancy.benefits.map((benefit: string, index: number): React.ReactNode => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            ) : (
                                "No benefits listed"
                            )}
                        </div>

                        <div className={"flex flex-col gap-4"}>
                            <div className="flex items-center gap-3 mt-4">
                                <span className={"blueBox"}>
                                    <p className={"blueBoxText"}>{vacancy.remote}</p>
                                </span>
                                <span className={"blueBox"}>
                                    <p className={"blueBoxText"}>{vacancy.jobType}</p>
                                </span>
                            </div>

                            <div
                                className={"flex flex-row rounded-lg w-full items-center md:justify-center"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960"
                                     width="24" fill="#991b1b">
                                    <path
                                        d="M480.06-486.67q30.27 0 51.77-21.56 21.5-21.55 21.5-51.83 0-30.27-21.56-51.77-21.55-21.5-51.83-21.5-30.27 0-51.77 21.56-21.5 21.55-21.5 51.83 0 30.27 21.56 51.77 21.55 21.5 51.83 21.5ZM480-168q129.33-118 191.33-214.17 62-96.16 62-169.83 0-114.86-73.36-188.1-73.36-73.23-179.97-73.23T300.03-740.1q-73.36 73.24-73.36 188.1 0 73.67 63 169.83Q352.67-286 480-168Zm0 88Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                                </svg>

                                <p className={"text-xl font-semibold text-red-800 md:text-center"}> {vacancy.location}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={"flex justify-between items-center"}>
                    <div className={"self-end border border-black rounded-lg bg-gray-100 p-1 px-2"}>
                        <p className={"text-md md:text-xl font-medium"}>{vacancy.datePosted}</p>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={(): void => {
                                saveVacancy(vacancy);
                                setShowDialog(false);
                            }}
                            className={`bottom-3 right-3 w-34 lg:w-40 p-1.5 border rounded-md hover:bg-yellow-400 
                                        transition-ease-in duration-300 font-semibold
                                        ${saved ? "bg-yellow-300 border-yellow-600 text-red-900" : "bg-gray-100 border-gray-400"
                            }`}
                        >
                            {saved ? "Unsave" : "Save"}
                        </button>

                        {applied ? (
                            <AppliedBox layout={"grid"}/>
                        ) : (
                            <button
                                onClick={(): void => {
                                    applyVacancy(vacancy);
                                    setShowDialog(false);
                                }}
                                className={"applyButton bottom-3 right-3 w-34 lg:w-40"}
                            >
                                Apply Now
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}