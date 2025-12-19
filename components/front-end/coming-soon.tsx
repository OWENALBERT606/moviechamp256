// // "use client"

// // import { useState } from "react"
// // import { Calendar, Bell } from "lucide-react"
// // import { Button } from "@/components/ui/button"

// // interface Movie {
// //   id: number
// //   title: string
// //   image: string
// //   releaseDate: string
// //   genre: string
// //   description: string
// // }

// // interface ComingSoonProps {
// //   movies: Movie[]
// // }

// // export function ComingSoon({ movies }: any) {
// //   const [notified, setNotified] = useState<number[]>([])

// //   const handleNotify = (id: number) => {
// //     setNotified((prev) => (prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id]))
// //   }

// //   return (
// //     <section className="py-12">
// //       <div className="flex items-center justify-between mb-8">
// //         <h2 className="text-3xl md:text-4xl font-bold text-foreground">Coming Soon</h2>
// //         <Calendar className="w-6 h-6 text-accent" />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {movies.map((movie:any) => (
// //           <div
// //             key={movie.id}
// //             className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:scale-[1.02]"
// //           >
// //             <div className="relative aspect-[16/9] overflow-hidden">
// //               <img
// //                 src={movie.image || "/placeholder.svg"}
// //                 alt={movie.title}
// //                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //             </div>

// //             <div className="p-6">
// //               <div className="flex items-start justify-between mb-3">
// //                 <div>
// //                   <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
// //                     {movie.title}
// //                   </h3>
// //                   <div className="flex items-center gap-3 text-sm text-muted-foreground">
// //                     <span className="px-2 py-1 bg-accent/10 text-accent rounded">{movie.genre}</span>
// //                     <span className="flex items-center gap-1">
// //                       <Calendar className="w-4 h-4" />
// //                       {movie.releaseDate}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{movie.description}</p>

// //               <Button
// //                 onClick={() => handleNotify(movie.id)}
// //                 variant={notified.includes(movie.id) ? "default" : "outline"}
// //                 className="w-full group/btn"
// //               >
// //                 <Bell
// //                   className={`w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110 ${
// //                     notified.includes(movie.id) ? "fill-current" : ""
// //                   }`}
// //                 />
// //                 {notified.includes(movie.id) ? "Notification Set" : "Notify Me"}
// //               </Button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   )
// // }





// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Calendar, Bell } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import type { Movie } from "@/actions/movies"

// interface ComingSoonProps {
//   movies: Movie[]
// }

// export function ComingSoon({ movies }: ComingSoonProps) {
//   const [notified, setNotified] = useState<string[]>([])

//   const handleNotify = (id: string) => {
//     setNotified((prev) => (prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id]))
//   }

//   if (movies.length === 0) {
//     return null
//   }

//   return (
//     <section className="py-12">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl md:text-4xl font-bold text-foreground">Coming Soon</h2>
//         <Calendar className="w-6 h-6 text-orange-500" />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-orange-500 transition-all duration-300 hover:scale-[1.02]"
//           >
//             <div className="relative aspect-[16/9] overflow-hidden">
//               <Image
//                 src={movie.trailerPoster || movie.poster || movie.image}
//                 alt={movie.title}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </div>

//             <div className="p-6">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
//                     {movie.title}
//                   </h3>
//                   <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
//                     <span className="px-2 py-1 bg-orange-500/10 text-orange-500 rounded text-xs">
//                       {movie.genre.name}
//                     </span>
//                     <span className="flex items-center gap-1 text-xs">
//                       <Calendar className="w-4 h-4" />
//                       {movie.year.value}
//                     </span>
//                     {movie.length && (
//                       <span className="text-xs">{movie.length}</span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
//                 {movie.description || "An exciting movie coming soon!"}
//               </p>

//               {/* VJ Info */}
//               {movie.vj && (
//                 <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
//                   <span>Translated by:</span>
//                   <span className="text-orange-500 font-medium">VJ {movie.vj.name}</span>
//                 </div>
//               )}

//               <Button
//                 onClick={() => handleNotify(movie.id)}
//                 variant={notified.includes(movie.id) ? "default" : "outline"}
//                 className={`w-full group/btn ${
//                   notified.includes(movie.id) 
//                     ? "bg-orange-500 hover:bg-orange-600 text-white" 
//                     : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
//                 }`}
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



"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, Calendar, Film, Tv } from "lucide-react";
import type { Movie } from "@/actions/movies";
import type { Series } from "@/actions/series";

interface ComingSoonProps {
  movies?: Movie[];
  series?: Series[];
}

type ComingSoonItem = (Movie | Series) & { type: "movie" | "series" };

export function ComingSoon({ movies = [], series = [] }: ComingSoonProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Combine movies and series with type indicator
  const items: ComingSoonItem[] = [
    ...movies.map((m) => ({ ...m, type: "movie" as const })),
    ...series.map((s) => ({ ...s, type: "series" as const })),
  ];

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("coming-soon-scroll");
    if (container) {
      const scrollAmount = container.offsetWidth;
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : scrollPosition + scrollAmount;

      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">📅 Coming Soon</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className="hover:bg-secondary"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className="hover:bg-secondary"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        id="coming-soon-scroll"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => {
          const link = item.type === "movie" ? `/movies/${item.slug}` : `/series/${item.slug}`;

          return (
            <Link key={`${item.type}-${item.id}`} href={link}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative aspect-video w-full">
                  <Image
                    src={item.trailerPoster || item.poster}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={item.type === "movie" ? "bg-purple-600" : "bg-blue-600"}>
                      {item.type === "movie" ? (
                        <>
                          <Film className="w-3 h-3 mr-1" />
                          Movie
                        </>
                      ) : (
                        <>
                          <Tv className="w-3 h-3 mr-1" />
                          Series
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-orange-600">Coming Soon</Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                    <h3 className="text-white font-bold text-lg line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                      <span>•</span>
                      <span>{item.year.value}</span>
                      <span>•</span>
                      <span>{item.genre.name}</span>
                    </div>
                    {/* {item.type === "series" && (
                      <p className="text-white/60 text-xs">
                        {item.totalSeasons} Season{item.totalSeasons !== 1 ? "s" : ""}
                      </p>
                    )} */}
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}