import React from "react";
import {Vacancy} from "../../types/Vacancy.ts";

interface ApplyButtonProps {
    vacancy: Vacancy;
    layout: "grid" | "list";
    applyVacancy: (vacancy: Vacancy) => void;
}

export default function ApplyButton({vacancy, layout, applyVacancy}: ApplyButtonProps) {
    return (
        <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                applyVacancy(vacancy);
            }}
            className={`applyButton 
                        transition-ease-in duration-300 text-red-900 
                        font-semibold ${layout === "grid" ? "w-full" : "absolute bottom-3 right-3 w-34 xl:w-40"}`}
            role="button"
            aria-label="Apply for Vacancy"
        >
            Apply Now!
        </button>
    );
}