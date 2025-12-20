
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Star, ChevronLeft, ChevronRight, Film, Tv } from "lucide-react";
import type { Movie } from "@/actions/movies";
import type { Series } from "@/actions/series";
import { AddToListButton } from "@/app/(front)/movies/components/add-to-list-button";

type HeroItem = (Movie | Series) & { type?: "movie" | "series" };

interface HeroCarouselProps {
  items: HeroItem[];
  userId: string | null | undefined;
}

export function HeroCarousel({ items, userId }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];
  const isMovie = !("totalSeasons" in currentItem);
  const link = isMovie ? `/movies/${currentItem.slug}` : `/series/${currentItem.slug}`;

  return (
    <div className="relative h-[85vh] mt-12 w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentItem.trailerPoster || currentItem.poster}
          alt={currentItem.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-12 lg:px-24">
          <div className="max-w-2xl space-y-6">
            {/* Type Badge */}
            <Badge variant="outline" className="w-fit">
              {isMovie ? (
                <>
                  <Film className="w-4 h-4 mr-2" />
                  Movie
                </>
              ) : (
                <>
                  <Tv className="w-4 h-4 mr-2" />
                  TV Series
                </>
              )}
            </Badge>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
              {currentItem.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-lg">{currentItem.rating.toFixed(1)}</span>
              </div>
              <span className="text-lg">{currentItem.year.value}</span>
              <span className="text-lg">{currentItem.genre.name}</span>
              {!isMovie && (
                <span className="text-lg">
                  {currentItem.totalSeasons} Season{currentItem.totalSeasons !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-white/90 line-clamp-3 leading-relaxed">
              {currentItem.description}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8"
                asChild
              >
                <Link href={link}>
                  <Play className="w-5 h-5 mr-2 fill-white" />
                  {currentItem.isComingSoon ? "View Details" : "Watch Now"}
                </Link>
              </Button>
                <AddToListButton
                                                   itemId={currentItem.id}
                                                   type={isMovie ? "movie" : "series"}
                                                   userId={userId || undefined}
                                                   variant="secondary"
                                                   size="icon"
                                                   showText={false}
                                                   className="h-10 w-10 rounded-full bg-gray-800/80 hover:bg-gray-700 border-0 backdrop-blur-sm"
                                                 />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}