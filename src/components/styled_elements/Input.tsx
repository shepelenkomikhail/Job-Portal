import {ChangeEvent, ReactNode} from "react";

interface InputProps {
    type: string;
    placeholder: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    svg?: ReactNode;
    width?: string;
    value?: string;
}

export default function Input({ type, placeholder, onChange, svg, width, value }: InputProps) {
    return (
        <div className={"flex items-center relative 2xl:w-1/2"} style={{ width: `${width}` }}>
            <input type={type} placeholder={placeholder} onChange={onChange} value={value}
                   className={`w-full bg-gray-50 border border-gray-600 rounded-md p-2 pl-4 focus:outline-0
                    focus:border-blue-500 focus:border-2`} style={svg ? { paddingLeft: '3rem' } : {}}
            />
            {svg && (
                <span className={"absolute left-2"}>
                    {svg}
                </span>
            )}
        </div>
    );
}