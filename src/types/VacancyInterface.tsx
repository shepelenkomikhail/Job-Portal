export interface VacancyInterface {
    id: number;
    company: string;
    companyLogo: string;
    title: string;
    industry: string;
    jobType: string;
    remote: string;
    location: string;
    benefits?: string[];
    datePosted: string;
    saved: boolean;
    relevancePoints: number;
    applied: boolean;
    jobDescription: string;
}
