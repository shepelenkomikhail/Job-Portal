import CheckBox from "../styled_elements/CheckBox.tsx";

export default function RemoteFilter() {
    return (
        <div>
            <h3 className={"mb-2"}>Remote</h3>
            <div className={"grid grid-cols-3"}>
                <CheckBox label={"On Site"} />
                <CheckBox label={"Hybrid"} />
                <CheckBox label={"Remote"} />
            </div>
        </div>
    );
}
