import React, { useState, useEffect } from "react";
import Input from "../styled_elements/Input.tsx";
import CheckBox from "../styled_elements/CheckBox.tsx";
import industriesData from "../../storage/industries.json";

interface IndustryFilterProps {
    onIndustrySelect: (industries: string[]) => void;
    reset: boolean;
}

export default function IndustryFilter({ onIndustrySelect, reset }: IndustryFilterProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredIndustries, setFilteredIndustries] = useState(industriesData);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);

    useEffect(() => {
        if (searchTerm) {
            setFilteredIndustries(
                industriesData.filter((industry) =>
                    industry.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredIndustries(industriesData);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (reset) {
            setSelectedIndustries([]);
        }
    }, [reset]);

    const handleIndustrySelect = (industry: string) => {
        if (!selectedIndustries.includes(industry)) {
            const updatedIndustries = [...selectedIndustries, industry];
            setSelectedIndustries(updatedIndustries);
            setIsDropdownVisible(false);
            onIndustrySelect(updatedIndustries);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsDropdownVisible(true);
    };

    const handleIndustryHover = (industry: string) => {
        setHoveredIndustry(industry);
    };

    const handleRemoveIndustry = (industry: string) => {
        const updatedIndustries = selectedIndustries.filter((i) => i !== industry);
        setSelectedIndustries(updatedIndustries);
        onIndustrySelect(updatedIndustries);
    };

    const handleCheckboxIndustrySelect = (industry: string, isChecked: boolean) => {
        const updatedIndustries = isChecked
            ? [...selectedIndustries, industry]
            : selectedIndustries.filter((i) => i !== industry);

        setSelectedIndustries(updatedIndustries);
        onIndustrySelect(updatedIndustries);
    };

    return (
        <div className={"flex flex-col justify-center gap-4"}>
            <div className={"relative"}>
                <h3 className={"mb-2"}>Industry</h3>
                <Input
                    type="text"
                    placeholder="Choose industry..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="40px" fill="#6b7280">
                            <path d="M764-120 523.67-360.33l66-66L830-186l-66 66Zm-571.33 0-66-66L412-471.33l-94-94-24.67 24.66L247-587v84l-25.33 25.33L100-599.33l25.33-25.34H210l-48.67-48.66L296-808q18-18 39-25t45-7q24 0 45 8.67 21 8.66 39 26.66l-102 102L410.67-654l-25.34 25.33 92 92L588.67-648q-6.67-12.33-10.5-27.67-3.84-15.33-3.84-32 0-55 39.17-94.16Q652.67-841 707.67-841q15 0 26.5 3t20.83 8.33L665.33-740l74 74L829-755.67q5.67 10 8.83 22.17 3.17 12.17 3.17 27.17 0 55-39.17 94.16Q762.67-573 707.67-573q-16 0-28.67-2.33-12.67-2.34-23.67-7.34L192.67-120Z" />
                        </svg>
                    }
                />
                {searchTerm && filteredIndustries.length > 0 && isDropdownVisible && (
                    <div
                        style={{ maxHeight: "400px" }}
                        className="absolute bg-white shadow-lg max-h-40 overflow-auto border border-gray-200 mt-2 rounded-md w-full z-10"
                    >
                        {filteredIndustries.map((industry, index) => (
                            <div
                                key={index}
                                className={`p-2 cursor-pointer ${selectedIndustries.includes(industry) ? "font-bold text-blue-800" : ""} 
                                    ${industry === hoveredIndustry ? "bg-gray-100" : ""}`}
                                onClick={() => handleIndustrySelect(industry)}
                                onMouseEnter={() => handleIndustryHover(industry)}
                                onMouseLeave={() => setHoveredIndustry(null)}
                            >
                                {industry}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={"flex flex-wrap flex-row space-x-1 w-full h-auto"}>
                {selectedIndustries.map((industry, index) => (
                    <div key={index} className="font-bold text-gray-500 mb-2">
                        <button type="button" onClick={() => handleRemoveIndustry(industry)} className="ml-2 text-gray-500 text-xl p-1">
                            x
                        </button>
                        {industry}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2">
                <div className="flex flex-col">
                    <label>
                        <CheckBox
                            label={"IT"}
                            checked={selectedIndustries.includes("IT")}
                            onChange={(e) => handleCheckboxIndustrySelect("IT", e.target.checked)}
                        />
                    </label>
                    <label>
                        <CheckBox
                            label={"Medicine"}
                            checked={selectedIndustries.includes("Medicine")}
                            onChange={(e) => handleCheckboxIndustrySelect("Medicine", e.target.checked)}
                        />
                    </label>
                    <label>
                        <CheckBox
                            label={"Construction"}
                            checked={selectedIndustries.includes("Construction")}
                            onChange={(e) => handleCheckboxIndustrySelect("Construction", e.target.checked)}
                        />
                    </label>
                </div>
                <div className="flex flex-col">
                    <label>
                        <CheckBox
                            label={"Media"}
                            checked={selectedIndustries.includes("Media")}
                            onChange={(e) => handleCheckboxIndustrySelect("Media", e.target.checked)}
                        />
                    </label>
                    <label>
                        <CheckBox
                            label={"Management"}
                            checked={selectedIndustries.includes("Management")}
                            onChange={(e) => handleCheckboxIndustrySelect("Management", e.target.checked)}
                        />
                    </label>
                    <label>
                        <CheckBox
                            label={"Law"}
                            checked={selectedIndustries.includes("Law")}
                            onChange={(e) => handleCheckboxIndustrySelect("Law", e.target.checked)}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
