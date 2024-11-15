import { useState } from "react";
import CheckBox from "../styled_elements/CheckBox.tsx";

export default function RemoteFilter({ onRemoteSelect }) {
    const [selectedRemoteOptions, setSelectedRemoteOptions] = useState<string[]>([]);

    const handleRemoteOptionChange = (option: string) => {
        setSelectedRemoteOptions(prev => {
            const updatedRemoteOptions = prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option];

            onRemoteSelect(updatedRemoteOptions);
            return updatedRemoteOptions;
        });
    };

    return (
        <div>
            <h3 className={"mb-2"}>Remote</h3>
            <div className={"grid grid-cols-3"}>
                <CheckBox
                    label="On Site"
                    checked={selectedRemoteOptions.includes("On Site")}
                    onChange={() => handleRemoteOptionChange("On Site")}
                />
                <CheckBox
                    label="Hybrid"
                    checked={selectedRemoteOptions.includes("Hybrid")}
                    onChange={() => handleRemoteOptionChange("Hybrid")}
                />
                <CheckBox
                    label="Remote"
                    checked={selectedRemoteOptions.includes("Remote")}
                    onChange={() => handleRemoteOptionChange("Remote")}
                />
            </div>
        </div>
    );
}
