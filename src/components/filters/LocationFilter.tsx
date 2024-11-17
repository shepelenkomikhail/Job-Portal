import React, { useState, useEffect, useRef } from "react";
import Input from "../styledElements/Input.tsx";
import { REACT_APP_OPENCAGE_API_KEY } from "../../storage/API.ts";
import LocationSearchSvg from "../svg/LocationSearchSvg.tsx";

const API_KEY: string|undefined = REACT_APP_OPENCAGE_API_KEY;

interface LocationFilterProps {
    onLocationSelect: (locations: string[]) => void;
    reset: boolean;
}

interface LocationResult {
    formatted: string;
    geometry: {
        lat: number;
        lng: number;
    };
}

interface GeocodeApiResponse {
    results: LocationResult[];
}

export default function LocationFilter({ onLocationSelect, reset }: LocationFilterProps) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredLocations, setFilteredLocations] = useState<LocationResult[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
    const dropdownRef: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    useEffect((): void => {
        if (searchTerm) {
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchTerm}&key=${API_KEY}`)
                .then((response) => response.json())
                .then((data: GeocodeApiResponse) => {
                    if (data.results) {
                        setFilteredLocations(data.results);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching location data:", error);
                });
        } else {
            setFilteredLocations([]);
        }
    }, [searchTerm]);

    useEffect((): void => {
        if (reset) {
            setSelectedLocations([]);
        }
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

    const handleLocationSelect: (location: string)=>void = (location: string): void => {
        if (!selectedLocations.includes(location)) {
            setSelectedLocations((prev: string[]): string[] => {
                const updatedLocations: string[] = [...prev, location];
                onLocationSelect(updatedLocations);
                return updatedLocations;
            });
            setIsDropdownVisible(false);
        }
    };

    const handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>)=>void =
        (e: React.ChangeEvent<HTMLInputElement>): void => {

        setSearchTerm(e.target.value);
        setIsDropdownVisible(true);
    };

    const handleLocationHover: (location: string)=>void = (location: string): void => {
        setHoveredLocation(location);
    };

    const handleRemoveLocation: (location: string)=>void = (location: string): void => {
        setSelectedLocations((prev: string[]): string[] => {
            const updatedLocations: string[] = prev.filter((l: string): boolean => l !== location);
            onLocationSelect(updatedLocations);
            return updatedLocations;
        });
    };

    return (
        <div className="flex flex-col justify-center gap-2" role="region" aria-labelledby="location-filter-title">
            <h3 id="location-filter-title" className="text-xl font-medium text-gray-800">Locations</h3>
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Add locations..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    aria-labelledby="location-search-input"
                    svg={<LocationSearchSvg />}
                />
                {searchTerm && filteredLocations.length > 0 && isDropdownVisible && (
                    <div
                        ref={dropdownRef}
                        style={{ maxHeight: "400px" }}
                        className="absolute bg-white shadow-lg overflow-auto max-h-40 border border-gray-200 mt-2 rounded-md w-full z-10"
                        role="listbox"
                        aria-labelledby="location-search-input"
                        aria-live="polite"
                    >
                        {filteredLocations.map((location: LocationResult, index: number): React.ReactNode => (
                            <div
                                key={index}
                                role="option"
                                aria-selected={selectedLocations.includes(location.formatted)}
                                className={`p-2 cursor-pointer ${selectedLocations.includes(location.formatted) ? "font-bold text-blue-800" : ""} 
                                    ${location.formatted === hoveredLocation ? "bg-gray-100" : ""}`}
                                onClick={(): void => handleLocationSelect(location.formatted)}
                                onMouseEnter={(): void => handleLocationHover(location.formatted)}
                                onMouseLeave={(): void => setHoveredLocation(null)}
                            >
                                {location.formatted}
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex flex-wrap flex-row space-x-1 w-full h-auto" role="list" aria-live="polite">
                    {selectedLocations.map((location:string, index: number): React.ReactNode => (
                        <div
                            key={index}
                            className="font-bold text-gray-500 mb-2 flex items-center"
                            role="listitem"
                        >
                            <button
                                type="button"
                                onClick={(): void => handleRemoveLocation(location)}
                                className="ml-2 text-gray-500 text-xl p-1"
                                aria-label={`Remove ${location} from selection`}
                            >
                                ✖
                            </button>
                            {location}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
