"use client";
import * as React from "react";
import CustomerIncomeFilter from "./CustomerIncomeFilter";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import clsx from "clsx";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  // overlay panel
  const filterPanel = (
    <div
      className={clsx(
        "bg-white rounded-l-xl shadow-xl flex flex-col gap-4 p-5 absolute right-0 top-4 z-50 transition-transform duration-300",
        "max-w-[90vw] w-[20rem] h-[calc(50dvh-2rem)] sm:hidden",
        filtersOpen
          ? "translate-x-0"
          : "translate-x-full pointer-events-none opacity-0"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-lg">Filters</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setFiltersOpen(false)}
          aria-label="Close filters"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
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
                className="w-full justify-between"
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
                className="w-full justify-between"
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
                className="w-full justify-between"
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
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-end mb-4 relative">
      {/* toggle button */}
      <div className="mb-2">
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

      {/* overlay mobile */}
      {isMobile && filtersOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setFiltersOpen(false)}
          />
          {filterPanel}
        </>
      )}

      {/* inline */}
      {!isMobile && (
        <div
          className={clsx(
            "w-full transition-all duration-300 ease-in-out overflow-hidden",
            filtersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          style={{ minWidth: "0" }}
        >
          <div className="flex justify-evenly gap-12 items-center">
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
        </div>
      )}
    </div>
  );
}
