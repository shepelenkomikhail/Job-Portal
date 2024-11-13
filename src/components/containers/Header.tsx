export default function Header(){
    return (
        <header className={"mx-12 mt-8"}>
            <div className={"flex justify-between items-center"}>
                <h1 className={"font-bold text-blue-900"}>Job Portal</h1>
                <h1 className={"text-4xl text-blue-950"}>We have a job for you!</h1>
                <div className={"flex gap-3"}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                         fill="#172554">
                        <path
                            d="m435.33-250 228-228L618-523.33l-183 183L338.33-437l-45 45 142 142ZM226.67-80q-27 0-46.84-19.83Q160-119.67 160-146.67v-666.66q0-27 19.83-46.84Q199.67-880 226.67-880H574l226 226v507.33q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm314-542.67v-190.66h-314v666.66h506.66v-476H540.67Zm-314-190.66v190.66-190.66 666.66-666.66Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                         fill="#172554">
                        <path
                            d="M200-120v-656.67q0-27 19.83-46.83 19.84-19.83 46.84-19.83h426.66q27 0 46.84 19.83Q760-803.67 760-776.67V-120L480-240 200-120Zm66.67-101.33L480-312l213.33 90.67v-555.34H266.67v555.34Zm0-555.34h426.66-426.66Z"/>
                    </svg>
                </div>
            </div>
            <hr className={"border-gray-300 h-0.5 mt-6"}></hr>
        </header>
    );
}