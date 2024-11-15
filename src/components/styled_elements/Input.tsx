import {ChangeEvent, ReactNode} from "react";

interface InputProps {
    type: string;
    placeholder: string;
    id?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    svg?: ReactNode;
    width?: string;
    value?: string;
}

export default function Input({ type, placeholder, onChange, svg, width, value, id }: InputProps) {
    return (
        <div className="relative flex items-center" style={{ width: `${width}` }} role="presentation">
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="w-full bg-gray-50 border border-gray-600 rounded-md p-2 pl-12 focus:outline-0 focus:border-blue-500 focus:border-2"
                aria-placeholder={placeholder}
                role="textbox"
                aria-describedby={svg ? "input-icon" : undefined}
            />
            {svg && (
                <span className="absolute left-2" role="img" aria-hidden="true" id="input-icon">
                {svg}
            </span>
            )}
        </div>
    );

}