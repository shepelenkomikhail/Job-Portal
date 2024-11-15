import {useEffect, useState} from "react";
import CheckBox from "../styled_elements/CheckBox.tsx";

interface JobTypeFilterProps {
    onJobTypeSelect: (jobTypes: string[]) => void;
    reset: boolean;
}

export default function JobTypeFilter({ onJobTypeSelect, reset }: JobTypeFilterProps) {
    const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

    const handleJobTypeChange = (jobType: string) => {
        setSelectedJobTypes(prev => {
            const updatedJobTypes = prev.includes(jobType)
                ? prev.filter(item => item !== jobType)
                : [...prev, jobType];

            onJobTypeSelect(updatedJobTypes);
            return updatedJobTypes;
        });
    };

    useEffect(() => {
        if(reset){
            setSelectedJobTypes([]);
        }
    }, [reset]);

    return (
        <div>
            <h3 className={"mb-2"}>Job Type</h3>
            <div className={"grid grid-cols-2"}>
                <CheckBox
                    label="Full Time"
                    checked={selectedJobTypes.includes("Full Time")}
                    onChange={() => handleJobTypeChange("Full Time")}
                />
                <CheckBox
                    label="Part Time"
                    checked={selectedJobTypes.includes("Part Time")}
                    onChange={() => handleJobTypeChange("Part Time")}
                />
            </div>
        </div>
    );
}
