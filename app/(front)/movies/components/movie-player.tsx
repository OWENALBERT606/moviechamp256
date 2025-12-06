"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/actions/movies";
import { MoviePlayer } from "@/components/front-end/movie-player";

interface MoviePlayerSectionProps {
  movie: Movie;
}

export function MoviePlayerA({ movie }: MoviePlayerSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative w-full mt-24">
        <MoviePlayer movie={movie} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={movie.trailerPoster || movie.poster || movie.image}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          size="lg"
          onClick={() => setIsPlaying(true)}
          className="w-20 h-20 rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 hover:scale-110"
        >
          <Play className="w-10 h-10 fill-white text-white ml-1" />
        </Button>
      </div>
    </div>
  );
}