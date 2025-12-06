"use client";

import type { Movie } from "@/actions/movies";

interface MovieTrailerProps {
  movie: Movie;
}

export function MovieTrailer({ movie }: MovieTrailerProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trailer</h2>
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <video
          controls
          poster={movie.trailerPoster}
          className="w-full h-full"
        >
          <source src={movie.trailerUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}