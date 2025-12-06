

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowBigDown, ChevronLeft, ChevronRight, Play, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/actions/movies"

interface MovieSectionProps {
  title: string
  movies: Movie[]
}

export function MovieSection({ title, movies }: MovieSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null)

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`scroll-${title.replace(/\s+/g, "-")}`)
    if (container) {
      const scrollAmount = container.offsetWidth
      const newPosition =
        direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

      container.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  if (movies.length === 0) {
    return null // Don't render section if no movies
  }

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => scroll("left")} className="hover:bg-secondary">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => scroll("right")} className="hover:bg-secondary">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        id={`scroll-${title.replace(/\s+/g, "-")}`}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[200px] md:w-[240px] group cursor-pointer snap-start"
            onMouseEnter={() => setHoveredMovie(movie.id)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <div className="relative overflow-hidden rounded-lg bg-card transition-transform duration-300 group-hover:scale-105 group-hover:z-10">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={movie.poster || movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 200px, 240px"
                />
              </div>

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
                  hoveredMovie === movie.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600" asChild>
                        <Link href={`/movies/${movie.slug}`}>
                          <Play className="w-4 h-4 fill-white" />
                        </Link>
                      </Button>
                      <Button
                        title="Add to my list"
                        size="sm"
                        variant="outline"
                        className="border-white/20 hover:bg-white/20 bg-white/10"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        title="Download"
                        variant="outline"
                        className="border-white/20 hover:bg-white/20 bg-white/10"
                      >
                        <ArrowBigDown className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-1 text-orange-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{movie.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-white text-balance line-clamp-2 text-sm">
                      {movie.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-white/70">
                      <span>{movie.year.value}</span>
                      <span>•</span>
                      <span>{movie.genre.name}</span>
                    </div>
                    {movie.vj && (
                      <div className="text-xs text-white/60">
                        VJ {movie.vj.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Trending Badge */}
              {movie.isTrending && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
                    🔥 Trending
                  </span>
                </div>
              )}

              {/* Rating Badge (Always Visible) */}
              <div className="absolute top-2 right-2 z-10">
                <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                  <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                  <span className="text-xs font-bold text-white">{movie.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}