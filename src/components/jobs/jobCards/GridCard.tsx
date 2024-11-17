import {CardProps} from "../../../types/CardProps.ts";
import AppliedBox from "../../styledElements/AppliedBox.tsx";
import ApplyButton from "../../styledElements/ApplyButton.tsx";
import LocationSvg from "../../svg/LocationSvg.tsx";
import React from "react";

export default function GridCard({ vacancy, applied, applyVacancy }: CardProps) {
    return (
        <div className={"flex items-start justify-start mt-2"} role="presentation">
            <div className={"flex flex-col items-start justify-start text-left"}>
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
                        <LocationSvg height={"24"} width={"24"}/>
                        <p className={"font-medium"}>{vacancy.location}</p>
                    </div>

                    {applied ? (
                        <AppliedBox layout={"grid"}/>
                    ) : (
                        <div className={"flex items-start justify-start md:items-center md:justify-center w-full"}
                            onClick={(e: React.MouseEvent<HTMLDivElement>): void => {e.stopPropagation()}}
                        >
                            <ApplyButton vacancy={vacancy} layout={"grid"} applyVacancy={applyVacancy}/>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}