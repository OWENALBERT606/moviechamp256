"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface MovieFiltersProps {
  genres: Array<{ id: string; name: string }>;
  vjs: Array<{ id: string; name: string }>;
  years: Array<{ id: string; value: number }>;
  initialFilters: {
    genre: string;
    vj: string;
    year: string;
    search: string;
  };
}

export function MovieFilters({ genres, vjs, years, initialFilters }: MovieFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState(initialFilters);

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Build query string
    const params = new URLSearchParams();
    if (newFilters.genre !== "all") params.set("genre", newFilters.genre);
    if (newFilters.vj !== "all") params.set("vj", newFilters.vj);
    if (newFilters.year !== "all") params.set("year", newFilters.year);
    if (newFilters.search) params.set("search", newFilters.search);

    // Update URL
    router.push(`/movies?${params.toString()}`);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search movies..."
            value={filters.search}
            onChange={(e) => updateFilters("search", e.target.value)}
            className="pl-10"
          />
        </div>
      <div className="flex gap-4">
        {/* Search */}
       

        {/* Genre Filter */}
        <Select
          value={filters.genre}
          onValueChange={(value) => updateFilters("genre", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* VJ Filter */}
        <Select
          value={filters.vj}
          onValueChange={(value) => updateFilters("vj", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All VJs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All VJs</SelectItem>
            {vjs.map((vj) => (
              <SelectItem key={vj.id} value={vj.id}>
                {vj.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select
          value={filters.year}
          onValueChange={(value) => updateFilters("year", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year.id} value={year.id}>
                {year.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      </div>
      
    </div>
  );
}