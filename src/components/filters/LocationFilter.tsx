import React, { useState, useEffect } from "react";
import Input from "../styled_elements/Input.tsx";


const API_KEY = "43bddd270498446c9b44f1cc1acaeb05";

export default function LocationFilter() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

    useEffect(() => {
        if (searchTerm) {
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchTerm}&key=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results) {
                        setFilteredLocations(data.results);
                    }
                })
                .catch(error => {
                    console.error("Error fetching location data:", error);
                });
        } else {
            setFilteredLocations([]);
        }
    }, [searchTerm]);

    const handleLocationSelect = (location: string) => {
        if (!selectedLocations.includes(location)) {
            setSelectedLocations(prev => [...prev, location]);
            setIsDropdownVisible(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsDropdownVisible(true);
    };

    const handleLocationHover = (location: string) => {
        setHoveredLocation(location);
    };

    const handleRemoveLocation = (location: string) => {
        setSelectedLocations(prev => prev.filter(l => l !== location));
    };

    return (
        <div className="flex flex-col justify-center">
            <div className={"relative"}>
                <h3 className="mb-2">Locations</h3>
                <Input type="text" placeholder="Add locations..." value={searchTerm} onChange={handleSearchChange}
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="40px" fill="#6b7280">
                            <path
                                d="M480.06-486.67q30.27 0 51.77-21.56 21.5-21.55 21.5-51.83 0-30.27-21.56-51.77-21.55-21.5-51.83-21.5-30.27 0-51.77 21.56-21.5 21.55-21.5 51.83 0 30.27 21.56 51.77 21.55 21.5 51.83 21.5ZM480-168q129.33-118 191.33-214.17 62-96.16 62-169.83 0-114.86-73.36-188.1-73.36-73.23-179.97-73.23T300.03-740.1q-73.36 73.24-73.36 188.1 0 73.67 63 169.83Q352.67-286 480-168Zm0 88Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                        </svg>
                    }
                />
                {searchTerm && filteredLocations.length > 0 && isDropdownVisible && (
                    <div style={{ maxHeight: "400px" }} className={"absolute bg-white shadow-lg max-h-40 overflow-auto border border-gray-200 mt-2 rounded-md w-full z-10"}>
                        {filteredLocations.map((location, index) => (
                            <div
                                key={index}
                                className={`p-2 cursor-pointer ${selectedLocations.includes(location.formatted) ? "font-bold text-blue-800" : ""} 
                                    ${location.formatted === hoveredLocation ? "bg-gray-100" : ""}`}
                                onClick={() => handleLocationSelect(location.formatted)}
                                onMouseEnter={() => handleLocationHover(location.formatted)}
                                onMouseLeave={() => setHoveredLocation(null)}
                            >
                                {location.formatted}
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap flex-row space-x-1 w-full h-auto">
                    {selectedLocations.map((location, index) => (
                        <div key={index} className="font-bold text-gray-500 mb-2">
                            <button type="button" onClick={() => handleRemoveLocation(location)} className="ml-2 text-gray-500 text-xl p-1">
                                x
                            </button>
                            {location}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
