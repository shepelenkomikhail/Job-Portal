import { useEffect, useState } from "react";
import CheckBox from "../styledElements/CheckBox.tsx";

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
        if (reset) {
            setSelectedJobTypes([]);
        }
    }, [reset]);

    return (
        <div role="region" aria-labelledby="job-type-filter" className="space-y-4">
            <h3 id="job-type-filter" className="mb-2 text-lg font-semibold" role="heading">Job Type</h3>
            <div role="group" aria-labelledby="job-type-selection" className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-0">
                <div role="checkbox" aria-checked={selectedJobTypes.includes("Full Time")} aria-label="Full Time">
                    <CheckBox
                        label="Full Time"
                        checked={selectedJobTypes.includes("Full Time")}
                        onChange={() => handleJobTypeChange("Full Time")}
                    />
                </div>
                <div role="checkbox" aria-checked={selectedJobTypes.includes("Part Time")} aria-label="Part Time">
                    <CheckBox
                        label="Part Time"
                        checked={selectedJobTypes.includes("Part Time")}
                        onChange={() => handleJobTypeChange("Part Time")}
                    />
                </div>
            </div>
        </div>
    );
}
