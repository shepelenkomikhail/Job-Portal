import {ChangeEvent, ReactNode} from "react";

interface InputProps {
    type: string;
    placeholder: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    svg?: ReactNode;
}

export default function Input({ type, placeholder, onChange, svg }: InputProps) {

    return (
        <div className={"relative w-9/12 2xl:w-1/2"}>
            <input type={type} placeholder={placeholder} onChange={onChange}
                   className={`w-full bg-gray-50 border border-gray-600 rounded-md p-2 pl-4 focus:outline-0
                    focus:border-blue-500 focus:border-2
                    ${svg ? 'pl-10' : ''}`}
            />
            {svg}
        </div>
    );
}