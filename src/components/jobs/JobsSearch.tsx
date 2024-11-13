import Input from "../styled_elements/Input.tsx";
import {useEffect, useState} from "react";
import CheckBox from "../styled_elements/CheckBox.tsx";

export default function JobsSearch() {
    const [grid, setGrid] = useState(true);

    useEffect(() => {
        localStorage.setItem("grid", JSON.stringify(grid));
    }, [grid]);

    return(
        <div className={"col-span-2 ml-2 flex flex-col"}>
            <div className={"flex w-full items-center justify-center gap-4"}>
                <Input type="text" placeholder="Search for jobs" width={"80%"} svg={
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="40px"
                          fill="#6b7280">
                    <path
                        d="M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z"/>
                </svg> }/>
                <button role={"button"} className={"hover:scale-105 transition-transform duration-200"} onClick={() => {setGrid(!grid)}}>
                    {!grid ? (
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                             fill="#6b7280">
                            <path
                                d="M120-513.33V-840h326.67v326.67H120ZM120-120v-326.67h326.67V-120H120Zm393.33-393.33V-840H840v326.67H513.33Zm0 393.33v-326.67H840V-120H513.33ZM186.67-580H380v-193.33H186.67V-580ZM580-580h193.33v-193.33H580V-580Zm0 393.33h193.33V-380H580v193.33Zm-393.33 0H380V-380H186.67v193.33ZM580-580Zm0 200Zm-200 0Zm0-200Z"/>
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                             fill="#6b7280">
                            <path
                                d="M120-200v-66.67h720V-200H120Zm0-164.67v-66.66h720v66.66H120Zm0-164v-66.66h720v66.66H120Zm0-164.66V-760h720v66.67H120Z"/>
                        </svg>
                        )
                    }
                </button>
            </div>
            <div className={"ml-14 mt-2 flex"}>
                <p className={"font-medium mr-4"}>Sort by :</p>
                    <div className={"grid grid-cols-2 gap-4 w-1/3"}>
                        <CheckBox label={"Relevance"}/>
                        <CheckBox label={"Date"}/>
                    </div>
            </div>
        </div>
    );
}