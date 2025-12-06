"use client";

import { Star, Plus, Share2, Download, Eye, HardDrive, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Movie } from "@/actions/movies";

interface MovieDetailsProps {
  movie: Movie;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const viewsCount = Number(movie.viewsCount || 0);

  return (
    <div className="space-y-6">
      {/* Title and Meta */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{movie.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
            <span className="font-bold text-white">{movie.rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-300">{movie.year.value}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-300">{movie.length || "N/A"}</span>
          <span className="text-gray-400">•</span>
          <Badge variant="outline" className="border-orange-500/30 text-orange-500">
            {movie.genre.name}
          </Badge>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Add to List
        </Button>
        <Button variant="outline" className="border-gray-700 bg-gray-900/50 hover:bg-gray-800">
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
        <Button variant="outline" className="border-gray-700 bg-gray-900/50 hover:bg-gray-800">
          <Download className="w-5 h-5 mr-2" />
          Download
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Eye className="w-4 h-4" />
            <span className="text-sm">Views</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {viewsCount >= 1000000
              ? `${(viewsCount / 1000000).toFixed(1)}M`
              : viewsCount >= 1000
              ? `${(viewsCount / 1000).toFixed(1)}K`
              : viewsCount}
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <HardDrive className="w-4 h-4" />
            <span className="text-sm">File Size</span>
          </div>
          <p className="text-2xl font-bold text-white">{movie.size || "N/A"}</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Duration</span>
          </div>
          <p className="text-2xl font-bold text-white">{movie.length || "N/A"}</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Release Year</span>
          </div>
          <p className="text-2xl font-bold text-white">{movie.year.value}</p>
        </div>
      </div>

      {/* Synopsis */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Synopsis</h2>
        <p className="text-gray-300 leading-relaxed">
          {movie.description || "No description available."}
        </p>
      </div>
    </div>
  );
}