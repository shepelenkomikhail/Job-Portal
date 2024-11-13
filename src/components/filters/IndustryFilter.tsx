export default function IndustryFilter() {
    return (
        <div>
            <label>Industry..</label>
            <input type="text" placeholder="Industry.." />
            <p>IT</p>
            <label>
                <input type="checkbox" /> Management
            </label>
            <label>
                <input type="checkbox" /> Consulting
            </label>
            <label>
                <input type="checkbox" /> Medical
            </label>
            <label>
                <input type="checkbox" checked /> IT
            </label>
            <label>
                <input type="checkbox" /> Law
            </label>
            <label>
                <input type="checkbox" /> Media
            </label>
        </div>
    );
}
