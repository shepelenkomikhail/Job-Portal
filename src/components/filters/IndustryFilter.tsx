import React, {useState, useEffect, useRef, ChangeEvent} from "react";
import Input from "../styledElements/Input.tsx";
import CheckBox from "../styledElements/CheckBox.tsx";
import industriesData from "../../storage/industries.json";
import IndustrySvg from "../svg/IndustrySvg.tsx";

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
    const dropdownRef: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    useEffect((): ()=>void => {
        const handleClickOutside: (event: MouseEvent)=>void = (event: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return (): void => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect((): void => {
        if (searchTerm) {
            setFilteredIndustries(
                industriesData.filter((industry: string): boolean =>
                    industry.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredIndustries(industriesData);
        }
    }, [searchTerm]);

    useEffect((): void => {
        if (reset) {
            setSelectedIndustries([]);
        }
    }, [reset]);

    const handleIndustrySelect: (industry: string)=>void  = (industry: string): void => {
        if (!selectedIndustries.includes(industry)) {
            const updatedIndustries: string[] = [...selectedIndustries, industry];
            setSelectedIndustries(updatedIndustries);
            setIsDropdownVisible(false);
            onIndustrySelect(updatedIndustries);
        }
    };

    const handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>)=>void =
        (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
        setIsDropdownVisible(true);
    };

    const handleIndustryHover: (industry: string)=>void = (industry: string): void => {
        setHoveredIndustry(industry);
    };

    const handleRemoveIndustry: (industry: string)=>void = (industry: string): void => {
        const updatedIndustries: string[] = selectedIndustries.filter((i: string): boolean => i !== industry);
        setSelectedIndustries(updatedIndustries);
        onIndustrySelect(updatedIndustries);
    };

    const handleCheckboxIndustrySelect: (industry: string, isChecked: boolean)=>void = (industry: string, isChecked: boolean): void => {
        const updatedIndustries: string[] = isChecked
            ? [...selectedIndustries, industry]
            : selectedIndustries.filter((i: string): boolean => i !== industry);

        setSelectedIndustries(updatedIndustries);
        onIndustrySelect(updatedIndustries);
    };

    return (
        <div className={"flex flex-col justify-center gap-4"} role="region" aria-labelledby="industry-filter">
            <div className={"relative"} role="search">
                <h3 id="industry-filter" className={"mb-2"}>Industry</h3>
                <Input
                    type="text"
                    placeholder="Choose industry..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    svg={<IndustrySvg/>}
                    aria-label="Industry search input"
                />
                {searchTerm && filteredIndustries.length > 0 && isDropdownVisible && (
                    <div
                        ref={dropdownRef}
                        style={{ maxHeight: "400px" }}
                        className="absolute bg-white shadow-lg max-h-40 overflow-auto border border-gray-200 mt-2 rounded-md w-full z-10"
                        role="listbox"
                        aria-expanded={isDropdownVisible ? "true" : "false"}
                    >
                        {filteredIndustries.map((industry: string, index: number): React.ReactNode => (
                            <div
                                key={index}
                                className={`p-2 cursor-pointer ${selectedIndustries.includes(industry) ? "font-bold text-blue-800" : ""} 
                                    ${industry === hoveredIndustry ? "bg-gray-100" : ""}`}
                                onClick={(): void => handleIndustrySelect(industry)}
                                onMouseEnter={(): void => handleIndustryHover(industry)}
                                onMouseLeave={(): void => setHoveredIndustry(null)}
                                role="option"
                                aria-selected={selectedIndustries.includes(industry) ? "true" : "false"}
                                aria-label={`Select ${industry}`}
                            >
                                {industry}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={"flex flex-wrap flex-row space-x-1 w-full h-auto"} role="list">
                {selectedIndustries.map((industry: string, index: number): React.ReactNode => (
                    <div key={index} className="font-bold text-gray-500 mb-2" role="listitem">
                        <button
                            type="button"
                            onClick={(): void => handleRemoveIndustry(industry)}
                            className="ml-2 text-gray-500 text-xl p-1"
                            aria-label={`Remove ${industry} from selected industries`}
                        >
                            ✖
                        </button>
                        {industry}
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1" role="group">
                <div className="flex flex-col">
                    <label>
                        <CheckBox
                            label={"IT"}
                            checked={selectedIndustries.includes("IT")}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                                handleCheckboxIndustrySelect("IT", e.target.checked)}
                            aria-label="Select IT industry"
                        />
                    </label>
                    <label>
                        <CheckBox
                            label={"Medicine"}
                            checked={selectedIndustries.includes("Medicine")}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                                handleCheckboxIndustrySelect("Medicine", e.target.checked)}
                            aria-label="Select Medicine industry"
                        />
                    </label>
                    <label>
                        <CheckBox
                            label={"Construction"}
                            checked={selectedIndustries.includes("Construction")}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                                handleCheckboxIndustrySelect("Construction", e.target.checked)}
                            aria-label="Select Construction industry"
                        />
                    </label>
                </div>
                <div className="flex flex-col">
                    <label>
                        <CheckBox
                            label={"Media"}
                            checked={selectedIndustries.includes("Media")}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                                handleCheckboxIndustrySelect("Media", e.target.checked)}
                            aria-label="Select Media industry"
                        />
                    </label>
                    <label>
                        <CheckBox
                            label={"Management"}
                            checked={selectedIndustries.includes("Management")}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                                handleCheckboxIndustrySelect("Management", e.target.checked)}
                            aria-label="Select Management industry"
                        />
                    </label>
                    <label>
                        <CheckBox
                            label={"Law"}
                            checked={selectedIndustries.includes("Law")}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                                handleCheckboxIndustrySelect("Law", e.target.checked)}
                            aria-label="Select Law industry"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
