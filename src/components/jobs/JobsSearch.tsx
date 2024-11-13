export default function JobsSearch() {
    return(
        <div className={"col-span-2 ml-2"}>
            <label>Search for jobs</label>
            <input type="text" placeholder="Search for jobs"/>
            <button>Search</button>
        </div>
    );
}