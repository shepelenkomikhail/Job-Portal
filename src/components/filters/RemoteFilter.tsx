import { useEffect, useState } from "react";
import CheckBox from "../styled_elements/CheckBox.tsx";

interface RemoteFilterProps {
    onRemoteSelect: (remoteOptions: string[]) => void;
    reset: boolean;
}

export default function RemoteFilter({ onRemoteSelect, reset }: RemoteFilterProps) {
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

    useEffect(() => {
        if (reset) {
            setSelectedRemoteOptions([]);
        }
    }, [reset]);

    return (
        <div role="region" aria-labelledby="remote-filter" className="space-y-4">
            <h3 id="remote-filter" className="mb-2 text-lg font-semibold" role="heading">Remote</h3>
            <div role="group" aria-labelledby="remote-option-selection" className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-0">
                <div role="checkbox" aria-checked={selectedRemoteOptions.includes("On Site")} aria-label="On Site">
                    <CheckBox
                        label="On Site"
                        checked={selectedRemoteOptions.includes("On Site")}
                        onChange={() => handleRemoteOptionChange("On Site")}
                    />
                </div>
                <div role="checkbox" aria-checked={selectedRemoteOptions.includes("Hybrid")} aria-label="Hybrid">
                    <CheckBox
                        label="Hybrid"
                        checked={selectedRemoteOptions.includes("Hybrid")}
                        onChange={() => handleRemoteOptionChange("Hybrid")}
                    />
                </div>
                <div role="checkbox" aria-checked={selectedRemoteOptions.includes("Remote")} aria-label="Remote">
                    <CheckBox
                        label="Remote"
                        checked={selectedRemoteOptions.includes("Remote")}
                        onChange={() => handleRemoteOptionChange("Remote")}
                    />
                </div>
            </div>
        </div>
    );
}
