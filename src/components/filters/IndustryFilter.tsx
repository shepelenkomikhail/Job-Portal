import Input from "../styled_elements/Input.tsx";
import CheckBox from "../styled_elements/CheckBox.tsx";

export default function IndustryFilter() {
    return (
        <div className={"flex flex-col justify-center gap-4"}>
            <div>
                <h3 className={"mb-2"}>Industry</h3>
                <Input type="text" placeholder="Chose industry.." svg={
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="40px"
                         fill="#6b7280">
                        <path
                            d="M764-120 523.67-360.33l66-66L830-186l-66 66Zm-571.33 0-66-66L412-471.33l-94-94-24.67 24.66L247-587v84l-25.33 25.33L100-599.33l25.33-25.34H210l-48.67-48.66L296-808q18-18 39-25t45-7q24 0 45 8.67 21 8.66 39 26.66l-102 102L410.67-654l-25.34 25.33 92 92L588.67-648q-6.67-12.33-10.5-27.67-3.84-15.33-3.84-32 0-55 39.17-94.16Q652.67-841 707.67-841q15 0 26.5 3t20.83 8.33L665.33-740l74 74L829-755.67q5.67 10 8.83 22.17 3.17 12.17 3.17 27.17 0 55-39.17 94.16Q762.67-573 707.67-573q-16 0-28.67-2.33-12.67-2.34-23.67-7.34L192.67-120Z"/>
                    </svg>
                }/>
            </div>
            <div className={"grid grid-cols-2"}>
                <div className={"flex flex-col"}>
                    <label>
                        <CheckBox label={"IT"}/>
                    </label>
                    <label>
                        <CheckBox label={"Medicine"}/>
                    </label>
                    <label>
                        <CheckBox label={"Constructing"}/>
                    </label>
                </div>
                <div className={"flex flex-col"}>
                    <label>
                        <CheckBox label={"Media"}/>
                    </label>
                    <label>
                        <CheckBox label={"Management"}/>
                    </label>
                    <label>
                        <CheckBox label={"Law"}/>
                    </label>
                </div>
            </div>
        </div>
    );
}
