import React, {useState, useEffect, useRef, ChangeEvent} from "react";
import Input from "../styledElements/Input.tsx";
import CheckBox from "../styledElements/CheckBox.tsx";
import companiesData from "../../storage/companies.json";
import WorkSvg from "../svg/WorkSvg.tsx";

interface CompanyFilterProps {
    onCompanySelect: (companies: string[]) => void;
    reset: boolean;
}

export default function CompanyFilter({ onCompanySelect, reset }: CompanyFilterProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState(companiesData);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
    const dropdownRef: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    useEffect((): void => {
        if (searchTerm) {
            setFilteredCompanies(
                companiesData.filter((company: string): boolean =>
                    company.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredCompanies(companiesData);
        }
    }, [searchTerm]);

    useEffect((): void => {
        if (reset) setSelectedCompanies([]);
    }, [reset]);

    useEffect((): ()=>void => {
        const handleClickOutside: (event: MouseEvent)=>void = (event: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return (): void => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCompanySelect: (company: string)=>void = (company: string): void => {
        if (!selectedCompanies.includes(company)) {
            const updatedCompanies: string[] = [...selectedCompanies, company];
            setSelectedCompanies(updatedCompanies);
            onCompanySelect(updatedCompanies);
            setIsDropdownVisible(false);
        }
    };

    const handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>)=>void =
        (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
        setIsDropdownVisible(true);
    };

    const handleCompanyHover: (company: string)=>void = (company: string): void => {
        setHoveredCompany(company);
    };

    const handleRemoveCompany: (company: string)=>void = (company: string): void => {
        const updatedCompanies: string[] = selectedCompanies.filter((c: string): boolean => c !== company);
        setSelectedCompanies(updatedCompanies);
        onCompanySelect(updatedCompanies);
    };

    const handleCheckboxCompanySelect: (company: string, isChecked: boolean)=>void =
        (company: string, isChecked: boolean): void => {
        let updatedCompanies: React.SetStateAction<string[]>;
        if (isChecked) {
            updatedCompanies = [...selectedCompanies, company];
        } else {
            updatedCompanies = selectedCompanies.filter((i: string): boolean => i !== company);
        }

        setSelectedCompanies(updatedCompanies);
        onCompanySelect(updatedCompanies);
    };

    return (
        <div className="flex flex-col justify-center gap-4"
             role="region"
             aria-labelledby="company-filter-title"
        >
            <h3 id="company-filter-title">Companies</h3>

            <div className="relative">
                <Input
                    type="text"
                    placeholder="Find companies.."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    svg={<WorkSvg/>}
                    aria-labelledby="company-search-input"
                />
                {searchTerm && filteredCompanies.length > 0 && isDropdownVisible && (
                    <div
                        ref={dropdownRef}
                        aria-live="polite"
                        style={{ maxHeight: "400px" }}
                        className="absolute bg-white shadow-lg max-h-40 overflow-auto border border-gray-200 mt-2 rounded-md w-full z-10"
                        role="listbox"
                        aria-labelledby="company-search-input"
                    >
                        {filteredCompanies.map((company: string, index: number): React.ReactNode => (
                            <div
                                key={index}
                                role="option"
                                aria-selected={selectedCompanies.includes(company)}
                                className={`p-2 cursor-pointer ${selectedCompanies.includes(company) ? "font-bold text-blue-800" : ""} 
                                    ${company === hoveredCompany ? "bg-gray-100" : ""}`}
                                onClick={(): void => handleCompanySelect(company)}
                                onMouseEnter={(): void => handleCompanyHover(company)}
                                onMouseLeave={(): void => setHoveredCompany(null)}
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-wrap flex-row space-x-1 w-full h-auto">
                {selectedCompanies.map((company: string, index: number): React.ReactNode => (
                    <div key={index} className="font-bold text-gray-500 mb-2">
                        <button
                            type="button"
                            onClick={(): void => handleRemoveCompany(company)}
                            className="ml-2 text-gray-500 text-xl p-1"
                            aria-label={`Remove ${company} from selection`}
                        >
                            ✖
                        </button>
                        {company}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2">
                <div className="flex flex-col">
                    <fieldset role="group" aria-labelledby="checkbox-group-1">
                        <legend id="checkbox-group-1" className="sr-only">First Group of Companies</legend>
                        <label>
                            <CheckBox
                                label="Apple"
                                checked={selectedCompanies.includes("Apple")}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => handleCheckboxCompanySelect("Apple", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Apple") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Microsoft"
                                checked={selectedCompanies.includes("Microsoft")}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => handleCheckboxCompanySelect("Microsoft", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Microsoft") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Google"
                                checked={selectedCompanies.includes("Google")}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => handleCheckboxCompanySelect("Google", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Google") ? "true" : "false"}
                            />
                        </label>
                    </fieldset>
                </div>
                <div className="flex flex-col">
                    <fieldset role="group" aria-labelledby="checkbox-group-2">
                        <legend id="checkbox-group-2" className="sr-only">Second Group of Companies</legend>
                        <label>
                            <CheckBox
                                label="Netflix"
                                checked={selectedCompanies.includes("Netflix")}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => handleCheckboxCompanySelect("Netflix", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Netflix") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Facebook"
                                checked={selectedCompanies.includes("Facebook")}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => handleCheckboxCompanySelect("Facebook", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Facebook") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Amazon"
                                checked={selectedCompanies.includes("Amazon")}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => handleCheckboxCompanySelect("Amazon", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Amazon") ? "true" : "false"}
                            />
                        </label>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
