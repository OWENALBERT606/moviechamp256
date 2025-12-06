// "use client"

// import { useState } from "react"
// import { Calendar, Bell } from "lucide-react"
// import { Button } from "@/components/ui/button"

// interface Movie {
//   id: number
//   title: string
//   image: string
//   releaseDate: string
//   genre: string
//   description: string
// }

// interface ComingSoonProps {
//   movies: Movie[]
// }

// export function ComingSoon({ movies }: any) {
//   const [notified, setNotified] = useState<number[]>([])

//   const handleNotify = (id: number) => {
//     setNotified((prev) => (prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id]))
//   }

//   return (
//     <section className="py-12">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl md:text-4xl font-bold text-foreground">Coming Soon</h2>
//         <Calendar className="w-6 h-6 text-accent" />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {movies.map((movie:any) => (
//           <div
//             key={movie.id}
//             className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:scale-[1.02]"
//           >
//             <div className="relative aspect-[16/9] overflow-hidden">
//               <img
//                 src={movie.image || "/placeholder.svg"}
//                 alt={movie.title}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </div>

//             <div className="p-6">
//               <div className="flex items-start justify-between mb-3">
//                 <div>
//                   <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
//                     {movie.title}
//                   </h3>
//                   <div className="flex items-center gap-3 text-sm text-muted-foreground">
//                     <span className="px-2 py-1 bg-accent/10 text-accent rounded">{movie.genre}</span>
//                     <span className="flex items-center gap-1">
//                       <Calendar className="w-4 h-4" />
//                       {movie.releaseDate}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{movie.description}</p>

//               <Button
//                 onClick={() => handleNotify(movie.id)}
//                 variant={notified.includes(movie.id) ? "default" : "outline"}
//                 className="w-full group/btn"
//               >
//                 <Bell
//                   className={`w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110 ${
//                     notified.includes(movie.id) ? "fill-current" : ""
//                   }`}
//                 />
//                 {notified.includes(movie.id) ? "Notification Set" : "Notify Me"}
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }





"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/actions/movies"

interface ComingSoonProps {
  movies: Movie[]
}

export function ComingSoon({ movies }: ComingSoonProps) {
  const [notified, setNotified] = useState<string[]>([])

  const handleNotify = (id: string) => {
    setNotified((prev) => (prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id]))
  }

  if (movies.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Coming Soon</h2>
        <Calendar className="w-6 h-6 text-orange-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-orange-500 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={movie.trailerPoster || movie.poster || movie.image}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                    <span className="px-2 py-1 bg-orange-500/10 text-orange-500 rounded text-xs">
                      {movie.genre.name}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <Calendar className="w-4 h-4" />
                      {movie.year.value}
                    </span>
                    {movie.length && (
                      <span className="text-xs">{movie.length}</span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {movie.description || "An exciting movie coming soon!"}
              </p>

              {/* VJ Info */}
              {movie.vj && (
                <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                  <span>Translated by:</span>
                  <span className="text-orange-500 font-medium">VJ {movie.vj.name}</span>
                </div>
              )}

              <Button
                onClick={() => handleNotify(movie.id)}
                variant={notified.includes(movie.id) ? "default" : "outline"}
                className={`w-full group/btn ${
                  notified.includes(movie.id) 
                    ? "bg-orange-500 hover:bg-orange-600 text-white" 
                    : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                }`}
              >
                <Bell
                  className={`w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110 ${
                    notified.includes(movie.id) ? "fill-current" : ""
                  }`}
                />
                {notified.includes(movie.id) ? "Notification Set" : "Notify Me"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}