"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Plus, Star } from "lucide-react";
import type { Series } from "@/actions/series";

interface SeriesGridProps {
  series: Series[];
}

export function SeriesGrid({ series }: SeriesGridProps) {
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);

  if (series.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground">No series found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {series.map((s) => (
        <div
          key={s.id}
          className="group cursor-pointer"
          onMouseEnter={() => setHoveredSeries(s.id)}
          onMouseLeave={() => setHoveredSeries(null)}
        >
          <div className="relative overflow-hidden rounded-lg bg-card transition-transform duration-300 group-hover:scale-105 group-hover:z-10">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={s.poster}
                alt={s.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16.66vw"
              />
            </div>

            {/* Hover Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
                hoveredSeries === s.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center space-x-1">
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600 h-7 w-7 p-0" 
                      asChild
                    >
                      <Link href={`/series/${s.slug}`}>
                        <Play className="w-3 h-3 fill-white" />
                      </Link>
                    </Button>
                    <Button
                      title="Add to my list"
                      size="sm"
                      variant="outline"
                      className="border-white/20 hover:bg-white/20 bg-white/10 h-7 w-7 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-1 text-orange-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-medium">{s.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-semibold text-white text-balance line-clamp-2 text-xs leading-tight">
                    {s.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-[10px] text-white/70">
                    <span>{s.year.value}</span>
                    <span>•</span>
                    <span className="truncate">{s.genre.name}</span>
                  </div>
                  <div className="text-[10px] text-white/60">
                    {s.totalSeasons} Season{s.totalSeasons !== 1 ? 's' : ''} • {s.totalEpisodes} Eps
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            {s.isTrending && (
              <div className="absolute top-2 left-2 z-10">
                <span className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-semibold rounded">
                  🔥 Trending
                </span>
              </div>
            )}

            {s.isComingSoon && (
              <div className="absolute top-2 left-2 z-10">
                <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-semibold rounded">
                  Coming Soon
                </span>
              </div>
            )}

            <div className="absolute top-2 right-2 z-10">
              <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
                <Star className="w-2.5 h-2.5 fill-orange-500 text-orange-500" />
                <span className="text-[10px] font-bold text-white">{s.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}