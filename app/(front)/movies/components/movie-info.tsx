"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Calendar, Clock, Eye } from "lucide-react";
import type { Movie } from "@/actions/movies";

interface MovieInfoProps {
  movie: Movie;
}

export function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="space-y-8">
      {/* Title and Meta */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.year.value}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{movie.length || "N/A"}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{movie.rating.toFixed(1)}/10</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{Number(movie.viewsCount).toLocaleString()} views</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{movie.genre.name}</Badge>
          {movie.isTrending && <Badge>Trending</Badge>}
          {movie.isComingSoon && <Badge variant="outline">Coming Soon</Badge>}
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Description</h2>
        <p className="text-muted-foreground leading-relaxed">
          {movie.description}
        </p>
      </div>

      {/* VJ Info */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Video Jockey</h2>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={movie.vj.avatarUrl} alt={movie.vj.name} />
            <AvatarFallback>
              {movie.vj.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{movie.vj.name}</div>
            {movie.vj.bio && (
              <div className="text-sm text-muted-foreground">{movie.vj.bio}</div>
            )}
          </div>
        </div>
      </div>

      {/* Cast */}
      {movie.cast && movie.cast.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-3">Cast</h2>
          <div className="flex flex-wrap gap-2">
            {movie.cast.map((actor, index) => (
              <Badge key={index} variant="outline">
                {actor}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Director */}
      {movie.director && (
        <div>
          <h2 className="text-2xl font-semibold mb-3">Director</h2>
          <p className="text-muted-foreground">{movie.director}</p>
        </div>
      )}
    </div>
  );
}