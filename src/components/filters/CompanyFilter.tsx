import Input from "../styled_elements/Input.tsx";
import CheckBox from "../styled_elements/CheckBox.tsx";

export default function CompanyFilter() {
    return (
        <div className={"flex flex-col justify-center gap-4"}>
            <div>
                <h3 className={"mb-2"}>Companies</h3>
                <Input type="text" placeholder="Find companies.." svg={
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="40px"
                         fill="#6b7280">
                        <path
                            d="M146.67-120q-27 0-46.84-19.83Q80-159.67 80-186.67v-466.66q0-27 19.83-46.84Q119.67-720 146.67-720H320v-93.33q0-27 19.83-46.84Q359.67-880 386.67-880h186.66q27 0 46.84 19.83Q640-840.33 640-813.33V-720h173.33q27 0 46.84 19.83Q880-680.33 880-653.33v466.66q0 27-19.83 46.84Q840.33-120 813.33-120H146.67Zm0-66.67h666.66v-466.66H146.67v466.66Zm240-533.33h186.66v-93.33H386.67V-720Zm-240 533.33v-466.66 466.66Z"/>
                    </svg>
                }/>
            </div>
            <div className={"grid grid-cols-2"}>
                <div className={"flex flex-col"}>
                    <label>
                        <CheckBox label={"Apple"}/>
                    </label>
                    <label>
                        <CheckBox label={"Microsoft"}/>
                    </label>
                    <label>
                        <CheckBox label={"Google"}/>
                    </label>
                </div>
                <div className={"flex flex-col"}>
                    <label>
                        <CheckBox label={"Netflix"}/>
                    </label>
                    <label>
                        <CheckBox label={"Facebook"}/>
                    </label>
                    <label>
                        <CheckBox label={"Amazon"}/>
                    </label>
                </div>
            </div>
        </div>
    );
}
