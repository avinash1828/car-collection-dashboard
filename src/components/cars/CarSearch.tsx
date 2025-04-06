
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CarSearchProps {
  onSearch: (params: { query: string; make: string; year: string }) => void;
  makes: string[];
  years: string[];
}

export const CarSearch = ({ onSearch, makes, years }: CarSearchProps) => {
  const [query, setQuery] = useState("");
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch({ query: newQuery, make, year });
  };

  const handleMakeChange = (value: string) => {
    setMake(value);
    onSearch({ query, make: value, year });
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    onSearch({ query, make, year: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            id="search"
            type="search"
            placeholder="Search cars..."
            className="pl-10"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        
        <div>
          <Select value={make} onValueChange={handleMakeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Makes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Makes</SelectItem>
              {makes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={year} onValueChange={handleYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
