import { useState } from "react";
import CheckBox from "../styled_elements/CheckBox.tsx";

export default function BenefitsFilter({ onBenefitsSelect }) {
    const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

    const handleBenefitChange = (benefit: string) => {
        setSelectedBenefits(prev => {
            const updatedBenefits = prev.includes(benefit)
                ? prev.filter(item => item !== benefit)
                : [...prev, benefit];

            onBenefitsSelect(updatedBenefits);
            return updatedBenefits;
        });
    };

    return (
        <div>
            <h3 className={"mb-2"}>Benefits</h3>
            <div className={"grid grid-cols-2"}>
                <div className={"flex flex-col"}>
                    <label>
                        <CheckBox
                            label="Maternity leave"
                            checked={selectedBenefits.includes("Maternity leave")}
                            onChange={() => handleBenefitChange("Maternity leave")}
                        />
                    </label>
                    <label>
                        <CheckBox
                            label="Student loan"
                            checked={selectedBenefits.includes("Student loan")}
                            onChange={() => handleBenefitChange("Student loan")}
                        />
                    </label>
                    <label>
                        <CheckBox
                            label="Pension plan"
                            checked={selectedBenefits.includes("Pension plan")}
                            onChange={() => handleBenefitChange("Pension plan")}
                        />
                    </label>
                </div>
                <div className={"flex flex-col"}>
                    <label>
                        <CheckBox
                            label="Medical insurance"
                            checked={selectedBenefits.includes("Medical insurance")}
                            onChange={() => handleBenefitChange("Medical insurance")}
                        />
                    </label>
                    <label>
                        <CheckBox
                            label="Dental insurance"
                            checked={selectedBenefits.includes("Dental insurance")}
                            onChange={() => handleBenefitChange("Dental insurance")}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
