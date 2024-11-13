import JobsSearch from "../jobs/JobsSearch.tsx";
import JobsList from "../jobs/JobsList.tsx";
export default function JobsContainer(){
    return(
        <div className={"col-span-2 ml-2"}>
            <JobsSearch/>
            <JobsList/>
        </div>
    );
}