import {useEffect, useState} from "react";
import CheckBox from "../styledElements/CheckBox.tsx";

interface BenefitsFilterProps {
    onBenefitsSelect: (benefits: string[]) => void;
    reset: boolean;
}

export default function BenefitsFilter({ onBenefitsSelect , reset}: BenefitsFilterProps) {
    const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

    const handleBenefitChange: (benefit: string)=>void = (benefit: string): void => {
        setSelectedBenefits((prev: string[]): string[] => {
            const updatedBenefits: string[] = prev.includes(benefit)
                ? prev.filter((item: string): boolean => item !== benefit)
                : [...prev, benefit];

            onBenefitsSelect(updatedBenefits);
            return updatedBenefits;
        });
    };

    useEffect((): void => {
        if (reset) {
            setSelectedBenefits([]);
        }
    }, [reset]);

    return (
        <div
            className="mb-4"
            role="region"
            aria-labelledby="benefits-filter-title"
        >
            <h3 id="benefits-filter-title" className="mb-2">Benefits</h3>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col">
                    <fieldset role="group" aria-labelledby="benefit-group-1">
                        <legend id="benefit-group-1" className="sr-only">First Group of Benefits</legend>
                        <label>
                            <CheckBox
                                label="Maternity leave"
                                checked={selectedBenefits.includes("Maternity leave")}
                                onChange={(): void => handleBenefitChange("Maternity leave")}
                                aria-checked={selectedBenefits.includes("Maternity leave") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Student loan"
                                checked={selectedBenefits.includes("Student loan")}
                                onChange={(): void => handleBenefitChange("Student loan")}
                                aria-checked={selectedBenefits.includes("Student loan") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Pension plan"
                                checked={selectedBenefits.includes("Pension plan")}
                                onChange={(): void => handleBenefitChange("Pension plan")}
                                aria-checked={selectedBenefits.includes("Pension plan") ? "true" : "false"}
                            />
                        </label>
                    </fieldset>
                </div>
                <div className="flex flex-col">
                    <fieldset role="group" aria-labelledby="benefit-group-2">
                        <legend id="benefit-group-2" className="sr-only">Second Group of Benefits</legend>
                        <label>
                            <CheckBox
                                label="Medical insurance"
                                checked={selectedBenefits.includes("Medical insurance")}
                                onChange={(): void => handleBenefitChange("Medical insurance")}
                                aria-checked={selectedBenefits.includes("Medical insurance") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Dental insurance"
                                checked={selectedBenefits.includes("Dental insurance")}
                                onChange={(): void => handleBenefitChange("Dental insurance")}
                                aria-checked={selectedBenefits.includes("Dental insurance") ? "true" : "false"}
                            />
                        </label>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
