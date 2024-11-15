import {VacancyInterface} from "../../types/VacancyInterface.tsx";
import {useEffect, useState} from "react";

export default function JobCard({vacancy, grid, fromSidebar}: {vacancy: VacancyInterface, grid: boolean, fromSidebar?: boolean}) {
    const [saved, setSaved] = useState(vacancy.saved);
    const [applied, setApplied] = useState(vacancy.applied);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const savedVacancies = localStorage.getItem("saved");
        const appliedVacancies = localStorage.getItem("applied");

        const savedList = savedVacancies ? JSON.parse(savedVacancies) : [];
        const appliedList = appliedVacancies ? JSON.parse(appliedVacancies) : [];

        setSaved(savedList.some((v: VacancyInterface) => v.id === vacancy.id));
        setApplied(appliedList.some((v: VacancyInterface) => v.id === vacancy.id));
    }, [vacancy.id]);

    function saveVacancy(vacancy: VacancyInterface) {
        const savedVacancies = localStorage.getItem("saved");
        let vacanciesList = savedVacancies ? JSON.parse(savedVacancies) : [];

        if (saved) {
            vacanciesList = vacanciesList.filter((v) => v.id !== vacancy.id);
        } else {
            vacanciesList.push(vacancy);
        }

        localStorage.setItem("saved", JSON.stringify(vacanciesList));
        setSaved((prevSaved) => !prevSaved);
    }

    function applyVacancy(vacancy: VacancyInterface) {
        const appliedVacancies = localStorage.getItem("applied");
        let vacanciesList = appliedVacancies ? JSON.parse(appliedVacancies) : [];

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
            <button
                className={`w-auto h-auto flex justify-center items-center rounded-full absolute top-0 right-0 ${!grid ? " -translate-x-1/4 translate-y-1/3": "translate-x-1/3 -translate-y-1/3"}`}
                role="button"
                aria-label="Save Vacancy"
                onClick={(e) => {
                    e.stopPropagation();
                    saveVacancy(vacancy);
                }}
            >
                <div className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill={saved ? "#F9E796" : "#ffffff"} width="40" height="40"
                         viewBox="-5 -2 24 24" stroke="#000000">
                        <path
                            d="M3 0h8a3 3 0 0 1 3 3v15a2 2 0 0 1-3.348 1.477L7.674 16.76a1 1 0 0 0-1.348 0l-2.978 2.717A2 2 0 0 1 0 18V3a3 3 0 0 1 3-3z"/>
                    </svg>
                </div>
            </button>

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

            <div>
                {grid ? (
                    <div className={"flex items-center justify-center mt-2"} role="presentation">
                        <div className={"flex flex-col items-center justify-center text-left"}>
                            <div className={"flex flex-row gap-4"}>
                                <img
                                    src={vacancy.companyLogo}
                                    className={"w-16 h-16 md:w-20 md:h-20 rounded-xl mb-2"}
                                    alt={`Logo of ${vacancy.company}`}
                                    role="img"
                                    aria-label={`${vacancy.company} logo`}
                                />
                                <div className={"flex flex-col"}>
                                    <h2 className={"font-semibold"} id="vacancy-card">{vacancy.title}</h2>
                                    <p>{vacancy.company}</p>
                                </div>
                            </div>
                            <div className={"flex flex-col w-11/12 items-center justify-center gap-2"}>
                                <div className={"flex mt-2"} role="presentation">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                         width="24" fill="#ef4444">
                                        <path
                                            d="M480.06-486.67q30.27 0 51.77-21.56 21.5-21.55 21.5-51.83 0-30.27-21.56-51.77-21.55-21.5-51.83-21.5-30.27 0-51.77 21.56-21.5 21.55-21.5 51.83 0 30.27 21.56 51.77 21.55 21.5 51.83 21.5ZM480-168q129.33-118 191.33-214.17 62-96.16 62-169.83 0-114.86-73.36-188.1-73.36-73.23-179.97-73.23T300.03-740.1q-73.36 73.24-73.36 188.1 0 73.67 63 169.83Q352.67-286 480-168Zm0 88Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                                    </svg>
                                    <p className={"font-medium"}>{vacancy.location}</p>
                                </div>
                                {applied ? (
                                    <div
                                        className={"bottom-3 right-3 w-full p-1.5 bg-blue-100 border border-blue-700 rounded-md "}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        <p className={"text-blue-900 font-semibold text-center"}>Applied!</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            applyVacancy(vacancy)
                                        }}
                                        className={"p-1.5 w-full bg-red-100 border border-red-700 rounded-md hover:bg-red-700 hover:text-white transition-ease-in duration-300 text-red-900 font-semibold"}
                                        role="button"
                                        aria-label="Apply for Vacancy"
                                    >
                                        Apply Now!
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={"flex flex-col items-start justify-start w-full"} role="presentation">
                        <div className="grid grid-cols-4 gap-6 items-start justify-start w-full">
                            <div className={"flex flex-col items-center justify-center gap-2"}>
                                <img
                                    src={vacancy.companyLogo}
                                    className={"w-20 h-18 rounded-xl"}
                                    alt={`Logo of ${vacancy.company}`}
                                    role="img"
                                    aria-label={`${vacancy.company} logo`}
                                />
                                <div className={"flex items-center"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960"
                                         width="24" fill="#ef4444">
                                        <path
                                            d="M480.06-486.67q30.27 0 51.77-21.56 21.5-21.55 21.5-51.83 0-30.27-21.56-51.77-21.55-21.5-51.83-21.5-30.27 0-51.77 21.56-21.5 21.55-21.5 51.83 0 30.27 21.56 51.77 21.55 21.5 51.83 21.5ZM480-168q129.33-118 191.33-214.17 62-96.16 62-169.83 0-114.86-73.36-188.1-73.36-73.23-179.97-73.23T300.03-740.1q-73.36 73.24-73.36 188.1 0 73.67 63 169.83Q352.67-286 480-168Zm0 88Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                                    </svg>
                                    <p className={"font-medium ml-1 text-sm text-center"}>{vacancy.location}</p>
                                </div>
                            </div>

                            <div className={"flex flex-col items-start col-span-2"}>
                                <h2 className={"font-bold text-xl text-left"} id="vacancy-card">{vacancy.title}</h2>
                                <p className={"font-semibold"}>"{vacancy.company}"</p>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className={"border border-blue-950 rounded-xl w-24"}>
                                        <p className={"font-medium text-blue-950 text-sm text-center"}>{vacancy.remote}</p>
                                    </span>
                                    <span className={"border border-blue-950 rounded-xl w-24"}>
                                        <p className={"font-medium text-blue-950 text-sm text-center"}>{vacancy.jobType}</p>
                                    </span>
                                </div>
                            </div>

                            {applied ? (
                                <div
                                    className={"absolute bottom-3 right-3 w-34 lg:w-40 p-1.5 bg-blue-100 border border-blue-700 rounded-md "}
                                    role="status" aria-live="polite">
                                    <p className={"text-blue-900 font-semibold text-center"}>Applied!</p>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        applyVacancy(vacancy)
                                    }}
                                    className={"absolute bottom-3 right-3 w-34 lg:w-40 p-1.5 bg-red-100 border border-red-700 rounded-md hover:bg-red-700 transition-ease-in duration-300 text-red-900 font-semibold hover:text-white"}
                                    role="button"
                                    aria-label="Apply for Vacancy"
                                >
                                    Apply Now!
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {showDialog && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scrolls`}
                    onClick={() => setShowDialog(false)}
                >
                    <div
                        className={`bg-white p-6 rounded-xl shadow-lg ${fromSidebar ? "w-full" : "w-11/12 md:w-2/3 lg:w-1/2"} h-3/4 md:h-auto cursor-auto overflow-y-scroll relative`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-700 hover:text-black"
                            onClick={() => setShowDialog(false)}
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
                                {/* Assume that here is a description */}
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris.
                                </p>
                            </div>
                            <div className={"flex flex-col md:justify-between mr-4"}>
                                <div className="mb-4">
                                    <strong>Benefits:</strong>{" "}
                                    {vacancy.benefits && vacancy.benefits.length > 0 ? (
                                        <ul className="list-disc ml-5">
                                            {vacancy.benefits.map((benefit, index) => (
                                                <li key={index}>{benefit}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "No benefits listed"
                                    )}
                                </div>

                                <div className={"flex flex-col gap-4"}>
                                    <div className="flex items-center gap-3 mt-4">
                                        <span className={"border border-blue-950 rounded-xl w-24"}>
                                            <p className={"font-medium text-blue-950 text-sm text-center"}>{vacancy.remote}</p>
                                        </span>
                                        <span className={"border border-blue-950 rounded-xl w-24"}>
                                            <p className={"font-medium text-blue-950 text-sm text-center"}>{vacancy.jobType}</p>
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
                                    onClick={() => {
                                        saveVacancy(vacancy);
                                        setShowDialog(false);
                                    }}
                                    className={`bottom-3 right-3 w-34 lg:w-40 p-1.5 border rounded-md hover:bg-yellow-400 transition-ease-in duration-300 font-semibold
                                        ${
                                        saved ? "bg-yellow-300 border-yellow-600 text-red-900" : "bg-gray-100 border-gray-400"
                                    }`}
                                >
                                    {saved ? "Unsave" : "Save"}
                                </button>
                                {!applied ? (
                                    <button
                                        onClick={() => {
                                            applyVacancy(vacancy);
                                            setShowDialog(false);
                                        }}
                                        className={"bottom-3 right-3 w-34 lg:w-40 p-1.5 bg-red-100 border border-red-700 rounded-md hover:bg-red-700 transition-ease-in duration-300 text-red-900 font-semibold hover:text-white"}
                                    >
                                        Apply Now
                                    </button>
                                ) : (
                                    <div
                                        className={"bottom-3 right-3 w-34 lg:w-40 p-1.5 bg-blue-100 border border-blue-700 rounded-md "}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        <p className={"text-blue-900 font-semibold text-center"}>Applied!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}