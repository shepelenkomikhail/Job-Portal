import Filters from "./Filters.tsx";
import JobsContainer from "./JobsContainer.tsx";

export default function MainContent(){
    return(
        <main className={"lg:grid lg:grid-cols-3 mx-12 mt-8"}>
            <Filters/>
            <JobsContainer/>
        </main>
    );
}