import {Vacancy} from "./Vacancy.ts";

export interface  CardProps {
    vacancy: Vacancy;
    applied: boolean;
    applyVacancy: (vacancy: Vacancy) => void;
}