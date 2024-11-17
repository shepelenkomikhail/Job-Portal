import {CardProps} from "../../../types/CardProps.ts";
import AppliedBox from "../../styledElements/AppliedBox.tsx";
import ApplyButton from "../../styledElements/ApplyButton.tsx";
import LocationSvg from "../../svg/LocationSvg.tsx";
import React from "react";

export default function ListCard({ vacancy, applied, applyVacancy }: CardProps) {
    return (
        <div className={"flex flex-col items-start justify-start w-full"} role="presentation">
            <div className="grid grid-cols-4 gap-6 items-start justify-start w-full">
                <div className={"flex flex-col items-center justify-center gap-2 pb-4"}>
                    <img
                        src={vacancy.companyLogo}
                        className={"w-20 h-18 rounded-xl mb-2"}
                        alt={`Logo of ${vacancy.company}`}
                        role="img"
                        aria-label={`${vacancy.company} logo`}
                    />
                    <div className={"flex items-center absolute bottom-2 "}>
                        <LocationSvg height={"20"} width={"24"}/>
                        <p className={"font-medium ml-1 text-sm text-center"}>{vacancy.location}</p>
                    </div>
                </div>

                <div className={"flex flex-col items-start col-span-2"}>
                    <h2 className={"font-bold text-xl text-left"} id="vacancy-card">{vacancy.title}</h2>
                    <p className={"font-semibold"}>"{vacancy.company}"</p>

                    <div className="flex items-center gap-3 mt-4">
                        <span className={"blueBox"}>
                            <p className={"blueBoxText"}>{vacancy.remote}</p>
                        </span>
                        <span className={"blueBox"}>
                            <p className={"blueBoxText"}>{vacancy.jobType}</p>
                        </span>
                    </div>
                </div>

                {applied ? (
                    <AppliedBox layout={"list"}/>
                ) : (
                    <div className={"flex items-center justify-center w-full"}
                         onClick={(e: React.MouseEvent<HTMLDivElement>): void => {e.stopPropagation()}}
                    >
                        <ApplyButton vacancy={vacancy} layout={"list"} applyVacancy={applyVacancy}/>
                    </div>
                )}

            </div>
        </div>
    );
}