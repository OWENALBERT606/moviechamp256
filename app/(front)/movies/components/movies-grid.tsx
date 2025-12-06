


// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Star } from "lucide-react"
// import type { Movie } from "@/actions/movies"

// interface MovieGridProps {
//   movies: Movie[]
// }

// export function MovieGrid({ movies }: MovieGridProps) {
//   if (movies.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-xl text-muted-foreground">No movies found</p>
//         <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//       {movies.map((movie) => (
//         <Link key={movie.id} href={`/movies/${movie.slug}`}>
//           <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
//             {/* Movie Poster */}
//             <div className="relative aspect-[2/3]">
//               <Image src={movie.poster || movie.image} alt={movie.title} fill className="object-cover" />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
//                   <div className="text-sm text-white/90">
//                     <p className="font-semibold">{movie.genre?.name || "N/A"}</p>
//                     <p className="text-xs text-white/70">Year: {movie.year?.value || "N/A"}</p>
//                     {movie.vj && <p className="text-xs text-white/70">VJ: {movie.vj.name}</p>}
//                   </div>
//                 </div>
//               </div>

//               {/* Rating Badge */}
//               <div className="absolute top-2 right-2">
//                 <Badge className="bg-black/70 backdrop-blur-sm">
//                   <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
//                   {movie.rating.toFixed(1)}
//                 </Badge>
//               </div>

//               {/* Trending Badge */}
//               {movie.isTrending && (
//                 <div className="absolute top-2 left-2">
//                   <Badge className="bg-red-600 text-white">Trending</Badge>
//                 </div>
//               )}
//             </div>
//           </Card>
//         </Link>
//       ))}
//     </div>
//   )
// }



"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Play } from "lucide-react"
import type { Movie } from "@/actions/movies"

interface MovieGridProps {
  movies: any[]
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground">No movies found</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
      </div>
    )
  }

  return (
 
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  {movies.map((movie) => (
    <Link key={movie.id} href={`/movies/${movie.slug}`}>
      <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 bg-transparent p-0">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] w-full h-full">
          <Image 
            src={movie.poster || movie.image} 
            alt={movie.title} 
            fill 
            className="object-cover rounded-lg" 
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
            {/* Movie Title */}
            <h3 className="text-white font-bold text-lg mb-3 line-clamp-2">{movie.title}</h3>

            {/* Movie Info Grid */}
            <div className="space-y-2 text-white text-xs mb-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 text-white/80">
                  <span>{movie.year?.value || "N/A"}</span>
                  <span>•</span>
                  <span>{movie.genre?.name || "N/A"}</span>
                  <span>•</span>
                  <span>{movie.length || "N/A"}</span>
                </div>
              </div>
              {movie.vj && (
                <p className="text-white/70">
                  VJ {movie.vj.name}
                </p>
              )}
            </div>

            {/* Watch Now Button */}
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold mb-2">
              <Play className="h-4 w-4 mr-2 fill-white" />
              Watch Now
            </Button>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-black/70 backdrop-blur-sm border-0">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              {movie.rating.toFixed(1)}
            </Badge>
          </div>

          {/* Trending Badge */}
          {movie.isTrending && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-red-600 text-white border-0">Trending</Badge>
            </div>
          )}
        </div>
      </Card>
    </Link>
  ))}
</div>
  )
}
