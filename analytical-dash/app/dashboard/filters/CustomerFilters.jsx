"use client";
import CustomerIncomeFilter from "./CustomerIncomeFilter";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import clsx from "clsx";

export default function CustomerFilters({
  sortName,
  setSortName,
  division,
  setDivision,
  allDivisions,
  gender,
  setGender,
  incomeMin,
  incomeMax,
  incomeRange,
  setIncomeRange,
  filtersOpen,
  setFiltersOpen,
}) {
  return (
    <div className="w-full flex items-center justify-end mb-4 relative overflow-x-hidden gap-12">
      <div
        className={clsx(
          "flex justify-evenly gap-12 items-center transition-opacity duration-300 ease-in-out",
          filtersOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        )}
        style={{ minWidth: "0" }}
      >
        {/* Name Sort */}
        <div>
          <label className="block text-xs font-semibold mb-1 text-gray-600">
            Name
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-28 justify-between"
              >
                {sortName === "az" ? "A - Z" : "Z - A"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => setSortName("az")}
                className={sortName === "az" ? "font-semibold" : ""}
              >
                A - Z
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setSortName("za")}
                className={sortName === "za" ? "font-semibold" : ""}
              >
                Z - A
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Division */}
        <div>
          <label className="block text-xs font-semibold mb-1 text-gray-600">
            Division
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-36 justify-between"
              >
                {division === "all" ? "All" : division}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => setDivision("all")}
                className={division === "all" ? "font-semibold" : ""}
              >
                All
              </DropdownMenuItem>
              {allDivisions.map((div) => (
                <DropdownMenuItem
                  key={div}
                  onSelect={() => setDivision(div)}
                  className={division === div ? "font-semibold" : ""}
                >
                  {div}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold mb-1 text-gray-600">
            Gender
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-24 justify-between"
              >
                {gender === "all"
                  ? "All"
                  : gender === "M"
                  ? "Male"
                  : gender === "F"
                  ? "Female"
                  : gender}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => setGender("all")}
                className={gender === "all" ? "font-semibold" : ""}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setGender("M")}
                className={gender === "M" ? "font-semibold" : ""}
              >
                Male
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setGender("F")}
                className={gender === "F" ? "font-semibold" : ""}
              >
                Female
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Income */}
        <div>
          <label className="block text-xs font-semibold mb-1 text-gray-600">
            Income Range
          </label>
          <CustomerIncomeFilter
            min={incomeMin}
            max={incomeMax}
            value={incomeRange}
            onChange={setIncomeRange}
          />
        </div>
      </div>

      {/* filters open/close */}
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">
          Filters
        </label>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setFiltersOpen((prev) => !prev)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {filtersOpen ? "Close Filters" : "Open Filters"}
        </Button>
      </div>
    </div>
  );
}
