import {
  FiltersState,
  setFilters,
  setViewMode,
  toggleFiltersFullOpen,
} from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { cleanParams, cn, formatPriceValue } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Filter, Grid, Icon, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyTypeIcons } from "@/lib/constants";
const FiltersBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useAppSelector((state) => state.global.filters);
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );
  const viewMode = useAppSelector((state) => state.global.viewMode);
  const [searchInput, setSearchInput] = useState(filters.location);

  const updateUrl = debounce((newFilters: FiltersState) => {
    const cleanFilters = cleanParams(newFilters);
    const updatedSearchParams = new URLSearchParams();

    Object.entries(cleanFilters).forEach(([key, value]) => {
      updatedSearchParams.set(
        key,
        Array.isArray(value) ? value.join(",") : value.toString()
      );
    });
    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  });
  const handleFilterChange = (
    key: string,
    value: any,
    isMin: boolean | null
  ) => {
    let newValue = value;
    if (key === "priceRange" || key === "squeareFeet") {
      const currentArrayRange = [...filters[key]];
      if (isMin !== null) {
        const index = isMin ? 0 : 1;
        currentArrayRange[index] = value === "any" ? null : Number(value);
      }
      newValue = currentArrayRange;
    } else if (key === "coordinates") {
      newValue = value === "any" ? [0, 0] : value.map(Number);
    } else {
      newValue = value === "any" ? "any" : value;
    }
    const newFilters = { ...filters, [key]: newValue };
    dispath(setFilters(newFilters));
    updateUrl(newFilters);
  };

  return (
    <div className="flex justify-between items-center w-full py-5">
      {/* Filters */}
      <div className="flex justify-between items-center gap-4 p-2">
        <Button
          variant="outline"
          className={cn(
            "gap-2 rounded-xl border-primary-400 hover:bg-primary-500 hover:text-primary-100",
            isFiltersFullOpen && "bg-primary-700 text-primary-100"
          )}
          onClick={() => dispath(toggleFiltersFullOpen())}
        >
          <Filter className="w-4 h-4" />
          <span>All Filters</span>
        </Button>

        <div className="flex items-center">
          <Input
            placeholder="Search Location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-40 rounded-xl rounded-r-none border-primary-400 border-r-0"
          />
          <Button
            //   onClick={handleLocationSearch}
            className="rounded-xl rounded-l-none border-l-none border-primary-400 shadow-none border hover:bg-primary-700 hover:text-primary-50"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Select
            value={filters.priceRange[0]?.toString() || "any"}
            onValueChange={(value) =>
              handleFilterChange("priceRange", value, true)
            }
          >
            <SelectTrigger className="w-35 rounded-xl border-primary-400">
              <SelectValue>
                {formatPriceValue(filters.priceRange[0], true)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Min price</SelectItem>
              {[500, 1000, 1500, 2000, 3000, 5000, 10000].map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  ${price / 1000}k+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.priceRange[0]?.toString() || "any"}
            onValueChange={(value) =>
              handleFilterChange("priceRange", value, false)
            }
          >
            <SelectTrigger className="w-35 rounded-xl border-primary-400">
              <SelectValue>
                {formatPriceValue(filters.priceRange[1], false)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Max price</SelectItem>
              {[1000, 2000, 3000, 5000, 10000].map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  ${price / 1000}k+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-1">
          <Select
            value={filters.beds}
            onValueChange={(value) => handleFilterChange("beds", value, null)}
          >
            <SelectTrigger className="w-26 rounded-xl border-primary-400">
              <SelectValue placeholder="Baths" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Beds</SelectItem>
              <SelectItem value="1">1+ bed</SelectItem>
              <SelectItem value="2">2+ beds</SelectItem>
              <SelectItem value="3">3+ beds</SelectItem>
              <SelectItem value="4">4+ beds</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.baths}
            onValueChange={(value) => handleFilterChange("baths", value, null)}
          >
            <SelectTrigger className="w-29 rounded-xl border-primary-400">
              <SelectValue placeholder="Baths" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Baths</SelectItem>
              <SelectItem value="1">1+ baths</SelectItem>
              <SelectItem value="2">2+ baths</SelectItem>
              <SelectItem value="3">3+ baths</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}

        <Select
          value={filters.propertyType || "any"}
          onValueChange={(value) =>
            handleFilterChange("propertyType", value, null)
          }
        >
          <SelectTrigger className="w-44 rounded-xl border-primary-400">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Property Type</SelectItem>
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-2" />
                  <span>{type}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-center gap-4 p-2">
        <div className="flex border rounded-xl">
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-l-xl hover:bg-primary-600 hover:text-primary-50",
              viewMode === "list" ? "bg-primary-700 text-primary-50" : ""
            )}
            onClick={() => dispatch(setViewMode("list"))}
          >
            <List className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-r-xl hover:bg-primary-600 hover:text-primary-50",
              viewMode === "grid" ? "bg-primary-700 text-primary-50" : ""
            )}
            onClick={()=> dispatch(setViewMode("grid"))}
          >
            <Grid className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
