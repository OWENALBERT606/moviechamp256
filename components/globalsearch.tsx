"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Film, Tv, User, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { globalSearch } from "@/actions/search";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "@/hooks/use-debounce";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  // Search when debounced query changes
  useEffect(() => {
    async function performSearch() {
      if (debouncedQuery.trim().length === 0) {
        setResults(null);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      const result = await globalSearch(debouncedQuery, 10);
      
      if (result.success && result.data) {
        setResults(result.data);
        setIsOpen(true);
      }
      
      setIsLoading(false);
    }

    performSearch();
  }, [debouncedQuery]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full md:w-64">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search movies, series..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          className="pl-10 bg-secondary border-border"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results && results.totalResults > 0 && (
        <div className="absolute top-full mt-2 w-full md:w-96 bg-background border border-border rounded-lg shadow-2xl max-h-[80vh] overflow-y-auto z-50">
          {/* Movies */}
          {results.movies.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <Film className="w-4 h-4 text-orange-500" />
                <h3 className="font-semibold text-sm">Movies ({results.movies.length})</h3>
              </div>
              <div className="space-y-2">
                {results.movies.map((movie: any) => (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <div className="relative w-12 h-16 flex-shrink-0">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{movie.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{movie.year.value}</span>
                        <span>•</span>
                        <span>{movie.genre.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Series */}
          {results.series.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <Tv className="w-4 h-4 text-blue-500" />
                <h3 className="font-semibold text-sm">TV Series ({results.series.length})</h3>
              </div>
              <div className="space-y-2">
                {results.series.map((series: any) => (
                  <Link
                    key={series.id}
                    href={`/series/${series.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <div className="relative w-12 h-16 flex-shrink-0">
                      <Image
                        src={series.poster}
                        alt={series.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{series.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{series.totalSeasons} Seasons</span>
                        <span>•</span>
                        <span>{series.genre.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* VJs */}
          {results.vjs.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-purple-500" />
                <h3 className="font-semibold text-sm">VJs ({results.vjs.length})</h3>
              </div>
              <div className="space-y-2">
                {results.vjs.map((vj: any) => (
                  <Link
                    key={vj.id}
                    href={`/vjs/${vj.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={vj.avatarUrl}
                        alt={vj.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <p className="font-medium text-sm">{vj.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Genres */}
          {results.genres.length > 0 && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-green-500" />
                <h3 className="font-semibold text-sm">Genres ({results.genres.length})</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {results.genres.map((genre: any) => (
                  <Link
                    key={genre.id}
                    href={`/genres/${genre.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {isOpen && results && results.totalResults === 0 && query.trim().length > 0 && (
        <div className="absolute top-full mt-2 w-full md:w-96 bg-background border border-border rounded-lg shadow-2xl p-6 text-center z-50">
          <p className="text-muted-foreground">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}