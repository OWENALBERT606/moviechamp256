"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play } from "lucide-react";
import type { Movie } from "@/actions/movies"; // Use the backend Movie type

interface RelatedMoviesProps {
  movies: Movie[];
}

export function RelatedMovies({ movies }: RelatedMoviesProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Related Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.slug}`}>
            <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="relative aspect-[2/3]">
                <Image
                  src={movie.poster || movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="h-10 w-10 text-white" />
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-black/70 backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    {movie.rating.toFixed(1)}
                  </Badge>
                </div>

                {/* Trending Badge */}
                {movie.isTrending && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-600 text-white">Trending</Badge>
                  </div>
                )}
              </div>
              
              {/* Movie Info */}
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{movie.year.value}</span>
                  <span className="truncate">{movie.genre.name}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}