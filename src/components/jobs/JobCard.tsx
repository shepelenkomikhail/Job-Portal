import {VacancyInterface} from "../../types/VacancyInterface.tsx";
import {useState} from "react";

export default function JobCard({vacancy, grid}: {vacancy: VacancyInterface, grid: boolean}) {
    const [saved, setSaved] = useState(vacancy.saved);
    const [applied, setApplied] = useState(vacancy.applied);

    function saveVacancy(vacancy: VacancyInterface) {
        const savedVacancies: string | null = localStorage.getItem("saved");
        let vacanciesList: VacancyInterface[] = savedVacancies ? JSON.parse(savedVacancies) : [];

        if (saved) {
            vacanciesList = vacanciesList.filter(v => v.id !== vacancy.id);
        } else {
            vacanciesList.push(vacancy);
        }

        setSaved(!saved);
        localStorage.setItem("saved", JSON.stringify(vacanciesList));
    }

    function applyVacancy(vacancy: VacancyInterface) {
        const appliedVacancies: string | null = localStorage.getItem("applied");
        let vacanciesList: VacancyInterface[] = appliedVacancies ? JSON.parse(appliedVacancies) : [];

        if (applied) {
            vacanciesList = vacanciesList.filter(v => v.id !== vacancy.id);
        } else {
            vacanciesList.push(vacancy);
        }

        setApplied(true);
        localStorage.setItem("applied", JSON.stringify(vacanciesList));
    }

    return (
        <div
            className={"border border-gray-400 rounded-xl p-4 transition-ease-in duration-300 hover:shadow-lg relative"}
            style={{width: grid ? "300px" : "100%"}}
            role="region"
            aria-labelledby="vacancy-card"
        >
            <button
                className={`w-auto h-auto flex justify-center items-center rounded-full absolute top-0 right-0 ${!grid ? " -translate-x-1/4 translate-y-1/3": "translate-x-1/3 -translate-y-1/3"}`}
                role="button"
                aria-label="Save Vacancy"
                onClick={() => {
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
                                    className={"w-20 h-20 rounded-xl mb-2"}
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
                                        onClick={() => applyVacancy(vacancy)}
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
                                    <p className={"font-medium ml-1 text-sm"}>{vacancy.location}</p>
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
                                    onClick={() => applyVacancy(vacancy)}
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
        </div>

    );
}