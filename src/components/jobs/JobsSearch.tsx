import Input from "../styledElements/Input.tsx";
import React, { useEffect, useState } from "react";
import CheckBox from "../styledElements/CheckBox.tsx";
import { useAtom } from "jotai";
import { dateAtom, gridVal, relevanceAtom, searchTermAtom } from "../../types/atoms.ts";
import SearchSvg from "../svg/SearchSvg.tsx";
import GridSvg from "../svg/GridSvg.tsx";
import ListSvg from "../svg/ListSvg.tsx";

export default function JobsSearch() {
    const [grid, setGrid] = useAtom(gridVal);
    const [search, setSearch] = useState("");
    const [, setSearchTerm] = useAtom(searchTermAtom);

    const [selectedRelevanceOption, setSelectedRelevanceOption] = useAtom(relevanceAtom);
    const [selectedDateOption, setSelectedDateOption] = useAtom(dateAtom);

    useEffect((): ()=>void => {
        const handleResize: ()=>void  = (): void => {
            if (window.innerWidth <= 680) {
                setGrid(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return (): void => window.removeEventListener("resize", handleResize);
    }, [setGrid]);

    useEffect((): void => {
        localStorage.setItem("grid", JSON.stringify(grid));
    }, [grid]);

    useEffect((): () => void => {
        const handler: ReturnType<typeof setTimeout> = setTimeout((): void => {

            if (search.length >= 0 || search === "") {
                setSearchTerm(search);
            }
        }, 300);
        return (): void => clearTimeout(handler);
    }, [search, setSearchTerm]);

    const handleRelevanceChange: ()=>void = ():void => {
        if (selectedRelevanceOption) {
            setSelectedRelevanceOption(false);
        } else {
            setSelectedRelevanceOption(true);
            setSelectedDateOption(false);
        }
    };

    const handleDateChange: ()=>void = ():void => {
        if (selectedDateOption) {
            setSelectedDateOption(false);
        } else {
            setSelectedDateOption(true);
            setSelectedRelevanceOption(false);
        }
    };

    return (
        <div className="col-span-2 ml-2 flex flex-col"
             role="form"
             aria-labelledby="jobs-search-form"
        >
            <div className="flex w-full pr-4 items-end justify-end md:items-center md:justify-center gap-4"
                 role="search"
            >
                <Input
                    type="text"
                    placeholder="Search for jobs"
                    width="80%"
                    value={search}
                    svg={<SearchSvg/>}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)}
                    aria-placeholder="Search for jobs"
                />
                <button
                    role="button"
                    className="hover:scale-105 transition-transform duration-200 hidden lg:block"
                    onClick={(): void => {setGrid(!grid);}}
                    aria-label="Toggle grid view"
                >
                    {grid ? ( <GridSvg/>) : (<ListSvg/>) }
                </button>
            </div>

            <div className="flex justify-center items-center mt-2 w-full lg:ml-14
                            lg:justify-start xl:items-start"
                 role="group"
                 aria-labelledby="sort-by"
            >
                <p className="font-medium mr-4" id="sort-by">Sort by :</p>

                <div className="xl:gap-2 xl:w-1/3 flex items-center"
                     role="radiogroup"
                     aria-labelledby="sort-by">
                    <CheckBox
                        label="Relevance"
                        checked={selectedRelevanceOption}
                        onChange={handleRelevanceChange}
                        aria-labelledby="relevance-option"
                    />
                    <CheckBox
                        label="Date"
                        checked={selectedDateOption}
                        onChange={handleDateChange}
                        aria-labelledby="date-option"
                    />
                </div>
            </div>
        </div>
    );
}