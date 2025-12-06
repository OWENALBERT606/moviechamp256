// "use client"

// import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight, Play, Plus, Info } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const heroMovies = [
//   {
//     id: 1,
//     title: "Quantum Horizon",
//     description:
//       "In a world where reality bends to quantum mechanics, a brilliant physicist discovers the key to manipulating time itself. But with great power comes devastating consequences.",
//     image: "/8507f90d74a40b47290766ce6f373043.jpg",
//     rating: 8.9,
//     year: 2024,
//     genre: "Sci-Fi Thriller",
//   },
//   {
//     id: 2,
//     title: "The Last Symphony",
//     description:
//       "A renowned conductor's final performance becomes a journey through memory, love, and the transformative power of music in this emotionally charged masterpiece.",
//     image: "/8fdeb8f8cc9b17c0c17cb6c5ae0fd35c.jpg",
//     rating: 9.2,
//     year: 2024,
//     genre: "Drama",
//   },
//   {
//     id: 3,
//     title: "Shadow Protocol",
//     description:
//       "When a covert operation goes wrong, an elite agent must navigate a web of betrayal and conspiracy to uncover the truth behind a global conspiracy.",
//     image: "/e0f205758f1bc8f56000b8823130b0e6.jpg",
//     rating: 8.5,
//     year: 2024,
//     genre: "Action Thriller",
//   },
// ]

// export function HeroCarousel({movies}:{movies:any}) {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroMovies.length)
//     }, 6000)

//     return () => clearInterval(timer)
//   }, [])

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroMovies.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroMovies.length) % heroMovies.length)
//   }

//   const currentMovie = heroMovies[currentSlide]

//   return (
//     <div className="relative h-screen overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
//         style={{ backgroundImage: `url(${currentMovie.image})` }}
//       >
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 h-full flex items-center">
//         <div className="px-4 md:px-8 lg:px-12 max-w-2xl">
//           <div className="space-y-6 animate-fade-in">
//             <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//               <span className="text-primary font-semibold">{currentMovie.year}</span>
//               <span>•</span>
//               <span>{currentMovie.genre}</span>
//               <span>•</span>
//               <div className="flex items-center space-x-1">
//                 <span className="text-primary">★</span>
//                 <span>{currentMovie.rating}</span>
//               </div>
//             </div>

//             <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">{currentMovie.title}</h1>

//             <p className="text-lg text-muted-foreground text-pretty leading-relaxed max-w-xl">
//               {currentMovie.description}
//             </p>

//             <div className="flex items-center space-x-4">
//               <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground golden-glow">
//                 <Play className="w-5 h-5 mr-2" />
//                 Play Now
//               </Button>
//               <Button size="lg" variant="outline" className="border-border hover:bg-secondary bg-transparent">
//                 <Plus className="w-5 h-5 mr-2" />
//                 My List
//               </Button>
//               <Button size="lg" variant="ghost" className="hover:bg-secondary">
//                 <Info className="w-5 h-5 mr-2" />
//                 More Info
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Arrows */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
//         onClick={prevSlide}
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </Button>

//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
//         onClick={nextSlide}
//       >
//         <ChevronRight className="w-6 h-6" />
//       </Button>

//       {/* Slide Indicators */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="flex space-x-2">
//           {heroMovies.map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentSlide ? "bg-primary golden-glow" : "bg-muted-foreground/50 hover:bg-muted-foreground"
//               }`}
//               onClick={() => setCurrentSlide(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }






"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Plus, Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/actions/movies"

interface HeroCarouselProps {
  movies: Movie[]
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Use props movies if available, otherwise show nothing
  const heroMovies = movies.length > 0 ? movies.slice(0, 5) : [] // Take first 5 movies

  useEffect(() => {
    if (heroMovies.length === 0) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMovies.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [heroMovies.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroMovies.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroMovies.length) % heroMovies.length)
  }

  // Show loading or empty state if no movies
  if (heroMovies.length === 0) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-muted-foreground">No featured movies available</h2>
          <p className="text-muted-foreground">Check back soon for exciting content!</p>
        </div>
      </div>
    )
  }

  const currentMovie = heroMovies[currentSlide]
  const viewsCount = Number(currentMovie.viewsCount || 0)
  const viewsFormatted =
    viewsCount >= 1000000
      ? `${(viewsCount / 1000000).toFixed(1)}M`
      : viewsCount >= 1000
      ? `${(viewsCount / 1000).toFixed(1)}K`
      : viewsCount

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${currentMovie.trailerPoster || currentMovie.poster || currentMovie.image})` 
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-4 md:px-8 lg:px-12 max-w-2xl">
          <div className="space-y-6 animate-fade-in">
            {/* Meta Information */}
            <div className="flex items-center flex-wrap gap-3 text-sm">
              <span className="text-primary font-semibold text-base">{currentMovie.year.value}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{currentMovie.genre.name}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{currentMovie.length || "N/A"}</span>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                <span className="text-foreground font-semibold">{currentMovie.rating.toFixed(1)}</span>
              </div>
              {viewsCount > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{viewsFormatted} views</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              {currentMovie.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed max-w-xl line-clamp-3">
              {currentMovie.description || "An exciting movie experience awaits you."}
            </p>

            {/* VJ Info */}
            {currentMovie.vj && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-primary">VJ {currentMovie.vj.name}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                asChild
              >
                <Link href={`/movies/${currentMovie.slug}`}>
                  <Play className="w-5 h-5 mr-2 fill-white" />
                  Play Now
                </Link>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-secondary bg-background/50 backdrop-blur-sm"
              >
                <Plus className="w-5 h-5 mr-2" />
                My List
              </Button>

              <Button 
                size="lg" 
                variant="ghost" 
                className="hover:bg-secondary bg-background/30 backdrop-blur-sm"
                asChild
              >
                <Link href={`/movies/${currentMovie.slug}`}>
                  <Info className="w-5 h-5 mr-2" />
                  More Info
                </Link>
              </Button>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
              {currentMovie.isTrending && (
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded">
                  🔥 TRENDING
                </span>
              )}
              {currentMovie.isComingSoon && (
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                  COMING SOON
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {heroMovies.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Slide Indicators */}
      {heroMovies.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {heroMovies.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-orange-500 w-8" 
                    : "bg-muted-foreground/50 hover:bg-muted-foreground"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}