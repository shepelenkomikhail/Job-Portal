import CheckBox from "../styled_elements/CheckBox.tsx";

export default function JobTypeFilter() {
    return (
        <div>
            <h3 className={"mb-2"}>Job Type</h3>
            <div className={"grid grid-cols-2"}>
                <CheckBox label={"Full Time"} />
                <CheckBox label={"Part Time"} />
            </div>
        </div>
    );
}
