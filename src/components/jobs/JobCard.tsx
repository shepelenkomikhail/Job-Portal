import {VacancyInterface} from "../../types/VacancyInterface.tsx";

export default function JobCard({vacancy, grid}: {vacancy: VacancyInterface, grid: boolean}) {

    return(
        <button className={"border border-gray-400 rounded-xl p-2 " +
            "transition-transform duration-300 hover:shadow-lg items-center h-auto"}
                style={{width: grid ? "300px" : "100%"}}>
            <div >
                {grid ? (
                    <div className={"flex gap-4 items-center text-center"}>
                        <div className={" flex flex-col w-24 h-full"}>
                            <img src={vacancy.companyLogo} className={"w-24 h-24 rounded-xl mb-2"}></img>
                            <button className={"bg-blue-800 text-white border rounded-xl " +
                                "hover:scale-105 transition-transform duration-100"}>
                                Apply Now!
                            </button>
                        </div>
                        <div className={"flex flex-col items-center"}>
                            <h2 className={"font-semibold"}>{vacancy.title}</h2>
                            <p> {vacancy.company}</p>
                            <div className={"flex mt-2"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                     fill="#ef4444">
                                    <path
                                        d="M480.06-486.67q30.27 0 51.77-21.56 21.5-21.55 21.5-51.83 0-30.27-21.56-51.77-21.55-21.5-51.83-21.5-30.27 0-51.77 21.56-21.5 21.55-21.5 51.83 0 30.27 21.56 51.77 21.55 21.5 51.83 21.5ZM480-168q129.33-118 191.33-214.17 62-96.16 62-169.83 0-114.86-73.36-188.1-73.36-73.23-179.97-73.23T300.03-740.1q-73.36 73.24-73.36 188.1 0 73.67 63 169.83Q352.67-286 480-168Zm0 88Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                                </svg>
                                <p className={"font-medium"}>{vacancy.location}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={"grid grid-cols-3"}>
                        {/* Logo and Button */}
                        <div className="flex flex-col items-center">
                            <img src={vacancy.companyLogo} className={"w-32 h-32 rounded-xl"} alt="Company Logo"/>
                            <button className={"w-32 mt-4 bg-blue-800 text-white border rounded-xl p-4" +
                                "hover:scale-105 transition-transform duration-100"}>
                                Apply Now!
                            </button>
                        </div>

                        {/* Job Title, Company, and Location */}
                        <div className={"flex flex-col items-center justify-center"}>
                            <h2 className={"font-bold text-xl mb-2"}>{vacancy.title}</h2>
                            <p className={"font-semibold"}>{vacancy.company}</p>
                            <div className={"flex mt-4 items-center"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                     fill="#ef4444">
                                    <path
                                        d="M480.06-486.67q30.27 0 51.77-21.56 21.5-21.55 21.5-51.83 0-30.27-21.56-51.77-21.55-21.5-51.83-21.5-30.27 0-51.77 21.56-21.5 21.55-21.5 51.83 0 30.27 21.56 51.77 21.55 21.5 51.83 21.5ZM480-168q129.33-118 191.33-214.17 62-96.16 62-169.83 0-114.86-73.36-188.1-73.36-73.23-179.97-73.23T300.03-740.1q-73.36 73.24-73.36 188.1 0 73.67 63 169.83Q352.67-286 480-168Zm0 88Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                                </svg>
                                <p className={"font-medium ml-1"}>{vacancy.location}</p>
                            </div>
                            {/* Job Type and Remote Info */}
                            <div className="flex items-center gap-3 mt-4">
                                <span className={"border border-red-500 bg-red-300 rounded-xl p-1"}>
                                    <p className={"font-medium text-red-800"}>{vacancy.remote}</p>
                                </span>
                                <span className={"border border-yellow-500 bg-yellow-300 rounded-xl p-1"}>
                                    <p className={"font-medium text-yellow-800"}>{vacancy.jobType}</p>
                                </span>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className={"flex flex-col space-y-3 justify-center"}>
                        {vacancy.benefits ? (
                                vacancy.benefits.map((benefit, index) => (
                                    <span className={"border border-green-500 bg-green-300 rounded-xl"}>
                                        <p key={index} className={"font-medium text-green-900 "}>{benefit}</p>
                                    </span>
                                ))
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>

                )}
            </div>
        </button>
    );
}