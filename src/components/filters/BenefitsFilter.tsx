import CheckBox from "../styled_elements/CheckBox.tsx";

export default function BenefitsFilter() {
    return (
        <div>
            <h3 className={"mb-2"}>Benefits</h3>
            <div className={"grid grid-cols-2"}>
                <div className={"flex flex-col"}>
                    <label>
                        <CheckBox label={"Maternity leave"}/>
                    </label>
                    <label>
                        <CheckBox label={"Student loan"}/>
                    </label>
                    <label>
                        <CheckBox label={"Pension plan"}/>
                    </label>
                </div>
                <div className={"flex flex-col"}>
                    <label>
                        <CheckBox label={"Medical insurance"}/>
                    </label>
                    <label>
                        <CheckBox label={"Dental insurance"}/>
                    </label>
                </div>
            </div>
        </div>
    );
}
