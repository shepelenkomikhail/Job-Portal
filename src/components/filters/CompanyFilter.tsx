import React, { useState, useEffect, useRef } from "react";
import Input from "../styledElements/Input.tsx";
import CheckBox from "../styledElements/CheckBox.tsx";
import companiesData from "../../storage/companies.json";

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
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (searchTerm) {
            setFilteredCompanies(
                companiesData.filter((company) =>
                    company.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredCompanies(companiesData);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (reset) {
            setSelectedCompanies([]);
        }
    }, [reset]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCompanySelect = (company: string) => {
        if (!selectedCompanies.includes(company)) {
            const updatedCompanies = [...selectedCompanies, company];
            setSelectedCompanies(updatedCompanies);
            onCompanySelect(updatedCompanies);
            setIsDropdownVisible(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsDropdownVisible(true);
    };

    const handleCompanyHover = (company: string) => {
        setHoveredCompany(company);
    };

    const handleRemoveCompany = (company: string) => {
        const updatedCompanies = selectedCompanies.filter((c) => c !== company);
        setSelectedCompanies(updatedCompanies);
        onCompanySelect(updatedCompanies);
    };

    const handleCheckboxCompanySelect = (company: string, isChecked: boolean) => {
        let updatedCompanies;
        if (isChecked) {
            updatedCompanies = [...selectedCompanies, company];
        } else {
            updatedCompanies = selectedCompanies.filter((i) => i !== company);
        }

        setSelectedCompanies(updatedCompanies);
        onCompanySelect(updatedCompanies);
    };

    return (
        <div className="flex flex-col justify-center gap-4" role="region" aria-labelledby="company-filter-title">
            <h3 id="company-filter-title">Companies</h3>
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Find companies.."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    svg={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="40px"
                            fill="#6b7280"
                            role="img"
                            aria-label="SearchSvg Icon"
                        >
                            <path d="M146.67-120q-27 0-46.84-19.83Q80-159.67 80-186.67v-466.66q0-27 19.83-46.84Q119.67-720 146.67-720H320v-93.33q0-27 19.83-46.84Q359.67-880 386.67-880h186.66q27 0 46.84 19.83Q640-840.33 640-813.33V-720h173.33q27 0 46.84 19.83Q880-680.33 880-653.33v466.66q0 27-19.83 46.84Q840.33-120 813.33-120H146.67Zm0-66.67h666.66v-466.66H146.67v466.66Zm240-533.33h186.66v-93.33H386.67V-720Zm-240 533.33v-466.66 466.66Z" />
                        </svg>
                    }
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
                        {filteredCompanies.map((company, index) => (
                            <div
                                key={index}
                                role="option"
                                aria-selected={selectedCompanies.includes(company)}
                                className={`p-2 cursor-pointer ${selectedCompanies.includes(company) ? "font-bold text-blue-800" : ""} 
                                    ${company === hoveredCompany ? "bg-gray-100" : ""}`}
                                onClick={() => handleCompanySelect(company)}
                                onMouseEnter={() => handleCompanyHover(company)}
                                onMouseLeave={() => setHoveredCompany(null)}
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-wrap flex-row space-x-1 w-full h-auto">
                {selectedCompanies.map((company, index) => (
                    <div key={index} className="font-bold text-gray-500 mb-2">
                        <button
                            type="button"
                            onClick={() => handleRemoveCompany(company)}
                            className="ml-2 text-gray-500 text-xl p-1"
                            aria-label={`Remove ${company} from selection`}
                        >
                            x
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
                                onChange={(e) => handleCheckboxCompanySelect("Apple", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Apple") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Microsoft"
                                checked={selectedCompanies.includes("Microsoft")}
                                onChange={(e) => handleCheckboxCompanySelect("Microsoft", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Microsoft") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Google"
                                checked={selectedCompanies.includes("Google")}
                                onChange={(e) => handleCheckboxCompanySelect("Google", e.target.checked)}
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
                                onChange={(e) => handleCheckboxCompanySelect("Netflix", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Netflix") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Facebook"
                                checked={selectedCompanies.includes("Facebook")}
                                onChange={(e) => handleCheckboxCompanySelect("Facebook", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Facebook") ? "true" : "false"}
                            />
                        </label>
                        <label>
                            <CheckBox
                                label="Amazon"
                                checked={selectedCompanies.includes("Amazon")}
                                onChange={(e) => handleCheckboxCompanySelect("Amazon", e.target.checked)}
                                aria-checked={selectedCompanies.includes("Amazon") ? "true" : "false"}
                            />
                        </label>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
