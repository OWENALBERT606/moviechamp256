// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Badge } from "@/components/ui/badge";
// // import { Star, Trash2, Film, Tv } from "lucide-react";
// // import { removeFromMyList } from "@/actions/mylist";
// // import { toast } from "sonner";
// // import type { MyListData } from "@/actions/mylist";

// // interface MyListContentProps {
// //   list: MyListData;
// //   userId: string;
// // }

// // export function MyListContent({ list: initialList, userId }: MyListContentProps) {
// //   const [list, setList] = useState(initialList);
// //   const [filter, setFilter] = useState<"all" | "movies" | "series">("all");
// //   const [removingId, setRemovingId] = useState<string | null>(null);

// //   const movies = list.movies || [];
// //   const series = list.series || [];

// //   const handleRemove = async (itemId: string, type: "movie" | "series") {
// //     setRemovingId(itemId);

// //     const result = await removeFromMyList(userId, itemId, type);

// //     if (result.success) {
// //       // Update local state
// //       setList((prev) => ({
// //         ...prev,
// //         movies: prev.movies?.filter((m) => m.movie.id !== itemId) || [],
// //         series: prev.series?.filter((s) => s.series.id !== itemId) || [],
// //       }));
// //       toast.success("Removed from your list");
// //     } else {
// //       toast.error(result.error || "Failed to remove");
// //     }

// //     setRemovingId(null);
// //   };

// //   const isEmpty = movies.length === 0 && series.length === 0;

// //   if (isEmpty) {
// //     return (
// //       <div className="text-center py-20">
// //         <div className="text-6xl mb-4">📺</div>
// //         <h2 className="text-2xl font-bold mb-2">Your list is empty</h2>
// //         <p className="text-muted-foreground mb-6">
// //           Start adding movies and series to watch later
// //         </p>
// //         <div className="flex gap-4 justify-center">
// //           <Button asChild>
// //             <Link href="/movies">Browse Movies</Link>
// //           </Button>
// //           <Button variant="outline" asChild>
// //             <Link href="/series">Browse Series</Link>
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const displayItems =
// //     filter === "all"
// //       ? [
// //           ...movies.map((m) => ({ ...m.movie, type: "movie" as const, listItemId: m.id, addedAt: m.addedAt })),
// //           ...series.map((s) => ({ ...s.series, type: "series" as const, listItemId: s.id, addedAt: s.addedAt })),
// //         ].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
// //       : filter === "movies"
// //       ? movies.map((m) => ({ ...m.movie, type: "movie" as const, listItemId: m.id, addedAt: m.addedAt }))
// //       : series.map((s) => ({ ...s.series, type: "series" as const, listItemId: s.id, addedAt: s.addedAt }));

// //   return (
// //     <>
// //       <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-8">
// //         <TabsList>
// //           <TabsTrigger value="all">
// //             All ({movies.length + series.length})
// //           </TabsTrigger>
// //           <TabsTrigger value="movies">
// //             <Film className="w-4 h-4 mr-2" />
// //             Movies ({movies.length})
// //           </TabsTrigger>
// //           <TabsTrigger value="series">
// //             <Tv className="w-4 h-4 mr-2" />
// //             Series ({series.length})
// //           </TabsTrigger>
// //         </TabsList>
// //       </Tabs>

// //       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
// //         {displayItems.map((item) => {
// //           const link =
// //             item.type === "movie"
// //               ? `/movies/${item.slug}`
// //               : `/series/${item.slug}`;

// //           return (
// //             <Card key={item.listItemId} className="group relative overflow-hidden">
// //               <Link href={link}>
// //                 <div className="relative aspect-[2/3] w-full">
// //                   <Image
// //                     src={item.poster}
// //                     alt={item.title}
// //                     fill
// //                     className="object-cover transition-transform group-hover:scale-105"
// //                   />

// //                   {/* Hover Overlay */}
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
// //                     <div className="absolute bottom-0 left-0 right-0 p-3">
// //                       <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
// //                         {item.title}
// //                       </h3>
// //                       <div className="flex items-center gap-2 text-xs text-white/80">
// //                         <div className="flex items-center gap-1">
// //                           <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
// //                           {item.rating.toFixed(1)}
// //                         </div>
// //                         <span>•</span>
// //                         <span>{item.year.value}</span>
// //                       </div>
// //                       {item.type === "series" && (
// //                         <p className="text-xs text-white/60 mt-1">
// //                           {item.totalSeasons} Season{item.totalSeasons !== 1 ? "s" : ""}
// //                         </p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Type Badge */}
// //                   <div className="absolute top-2 left-2 z-10">
// //                     <Badge variant={item.type === "movie" ? "default" : "secondary"}>
// //                       {item.type === "movie" ? (
// //                         <Film className="w-3 h-3" />
// //                       ) : (
// //                         <Tv className="w-3 h-3" />
// //                       )}
// //                     </Badge>
// //                   </div>
// //                 </div>
// //               </Link>

// //               {/* Remove Button */}
// //               <Button
// //                 variant="destructive"
// //                 size="icon"
// //                 className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
// //                 onClick={() => handleRemove(item.id, item.type)}
// //                 disabled={removingId === item.id}
// //               >
// //                 <Trash2 className="w-4 h-4" />
// //               </Button>
// //             </Card>
// //           );
// //         })}
// //       </div>
// //     </>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Star, Trash2, Film, Tv } from "lucide-react";
// import { removeFromMyList } from "@/actions/mylist";
// import { toast } from "sonner";
// import type { MyListData } from "@/actions/mylist";

// interface MyListContentProps {
//   list: MyListData;
//   userId: string;
// }

// export function MyListContent({ list: initialList, userId }: MyListContentProps) {
//   const [list, setList] = useState(initialList);
//   const [filter, setFilter] = useState<"all" | "movies" | "series">("all");
//   const [removingId, setRemovingId] = useState<string | null>(null);

//   const movies = list.movies || [];
//   const series = list.series || [];

//   const handleRemove = async (contentId: string, type: "movie" | "series") => {
//     setRemovingId(contentId);

//     const result = await removeFromMyList(userId, contentId, type);

//     if (result.success) {
//       // Update local state
//       setList((prev) => ({
//         ...prev,
//         movies: prev.movies?.filter((m) => m.movie.id !== contentId) || [],
//         series: prev.series?.filter((s) => s.series.id !== contentId) || [],
//       }));
//       toast.success("Removed from your list");
//     } else {
//       toast.error(result.error || "Failed to remove");
//     }

//     setRemovingId(null);
//   };

//   const isEmpty = movies.length === 0 && series.length === 0;

//   if (isEmpty) {
//     return (
//       <div className="text-center py-20">
//         <div className="text-6xl mb-4">📺</div>
//         <h2 className="text-2xl font-bold mb-2">Your list is empty</h2>
//         <p className="text-muted-foreground mb-6">
//           Start adding movies and series to watch later
//         </p>
//         <div className="flex gap-4 justify-center">
//           <Button asChild>
//             <Link href="/movies">Browse Movies</Link>
//           </Button>
//           <Button variant="outline" asChild>
//             <Link href="/series">Browse Series</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const displayItems =
//     filter === "all"
//       ? [
//           ...movies.map((m) => ({ 
//             ...m.movie, 
//             type: "movie" as const, 
//             listItemId: m.id, 
//             addedAt: m.addedAt,
//             contentId: m.movie.id // ✅ Add this for removal
//           })),
//           ...series.map((s) => ({ 
//             ...s.series, 
//             type: "series" as const, 
//             listItemId: s.id, 
//             addedAt: s.addedAt,
//             contentId: s.series.id // ✅ Add this for removal
//           })),
//         ].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
//       : filter === "movies"
//       ? movies.map((m) => ({ 
//           ...m.movie, 
//           type: "movie" as const, 
//           listItemId: m.id, 
//           addedAt: m.addedAt,
//           contentId: m.movie.id // ✅ Add this
//         }))
//       : series.map((s) => ({ 
//           ...s.series, 
//           type: "series" as const, 
//           listItemId: s.id, 
//           addedAt: s.addedAt,
//           contentId: s.series.id // ✅ Add this
//         }));

//   return (
//     <>
//       <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-8">
//         <TabsList>
//           <TabsTrigger value="all">
//             All ({movies.length + series.length})
//           </TabsTrigger>
//           <TabsTrigger value="movies">
//             <Film className="w-4 h-4 mr-2" />
//             Movies ({movies.length})
//           </TabsTrigger>
//           <TabsTrigger value="series">
//             <Tv className="w-4 h-4 mr-2" />
//             Series ({series.length})
//           </TabsTrigger>
//         </TabsList>
//       </Tabs>

//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {displayItems.map((item) => {
//           const link =
//             item.type === "movie"
//               ? `/movies/${item.slug}`
//               : `/series/${item.slug}`;

//           return (
//             <Card key={item.listItemId} className="group relative overflow-hidden">
//               <Link href={link}>
//                 <div className="relative aspect-[2/3] w-full">
//                   <Image
//                     src={item.poster}
//                     alt={item.title}
//                     fill
//                     className="object-cover transition-transform group-hover:scale-105"
//                   />

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
//                     <div className="absolute bottom-0 left-0 right-0 p-3">
//                       <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
//                         {item.title}
//                       </h3>
//                       <div className="flex items-center gap-2 text-xs text-white/80">
//                         <div className="flex items-center gap-1">
//                           <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                           {item.rating.toFixed(1)}
//                         </div>
//                         <span>•</span>
//                         <span>{item.year.value}</span>
//                       </div>
//                       {item.type === "series" && (
//                         <p className="text-xs text-white/60 mt-1">
//                           {item.totalSeasons} Season{item.totalSeasons !== 1 ? "s" : ""}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Type Badge */}
//                   <div className="absolute top-2 left-2 z-10">
//                     <Badge variant={item.type === "movie" ? "default" : "secondary"}>
//                       {item.type === "movie" ? (
//                         <Film className="w-3 h-3" />
//                       ) : (
//                         <Tv className="w-3 h-3" />
//                       )}
//                     </Badge>
//                   </div>
//                 </div>
//               </Link>

//               {/* Remove Button */}
//               <Button
//                 variant="destructive"
//                 size="icon"
//                 className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
//                 onClick={() => handleRemove(item.contentId, item.type)} // ✅ Fixed: use contentId
//                 disabled={removingId === item.contentId} // ✅ Fixed: check contentId
//               >
//                 <Trash2 className="w-4 h-4" />
//               </Button>
//             </Card>
//           );
//         })}
//       </div>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Trash2, Film, Tv } from "lucide-react";
import { removeFromMyList } from "@/actions/mylist";
import { toast } from "sonner";
import type { MyListData } from "@/actions/mylist";

interface MyListContentProps {
  list: MyListData;
  userId: string;
}

export function MyListContent({ list: initialList, userId }: MyListContentProps) {
  const [list, setList] = useState(initialList);
  const [filter, setFilter] = useState<"all" | "movies" | "series">("all");
  const [removingId, setRemovingId] = useState<string | null>(null);

  const movies = list.movies || [];
  const series = list.series || [];

  const handleRemove = async (contentId: string, type: "movie" | "series") => {
    setRemovingId(contentId);

    const result = await removeFromMyList(userId, contentId, type);

    if (result.success) {
      // Update local state
      setList((prev) => ({
        ...prev,
        movies: prev.movies?.filter((m) => m.movie.id !== contentId) || [],
        series: prev.series?.filter((s) => s.series.id !== contentId) || [],
      }));
      toast.success("Removed from your list");
    } else {
      toast.error(result.error || "Failed to remove");
    }

    setRemovingId(null);
  };

  const isEmpty = movies.length === 0 && series.length === 0;

  if (isEmpty) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📺</div>
        <h2 className="text-2xl font-bold mb-2">Your list is empty</h2>
        <p className="text-muted-foreground mb-6">
          Start adding movies and series to watch later
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/movies">Browse Movies</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/series">Browse Series</Link>
          </Button>
        </div>
      </div>
    );
  }

  const displayItems =
    filter === "all"
      ? [
          ...movies.map((m) => ({ 
            ...m.movie, 
            type: "movie" as const, 
            listItemId: m.id, 
            addedAt: m.addedAt,
            contentId: m.movie.id
          })),
          ...series.map((s) => ({ 
            ...s.series, 
            type: "series" as const, 
            listItemId: s.id, 
            addedAt: s.addedAt,
            contentId: s.series.id
          })),
        ].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      : filter === "movies"
      ? movies.map((m) => ({ 
          ...m.movie, 
          type: "movie" as const, 
          listItemId: m.id, 
          addedAt: m.addedAt,
          contentId: m.movie.id
        }))
      : series.map((s) => ({ 
          ...s.series, 
          type: "series" as const, 
          listItemId: s.id, 
          addedAt: s.addedAt,
          contentId: s.series.id
        }));

  return (
    <>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">
            All ({movies.length + series.length})
          </TabsTrigger>
          <TabsTrigger value="movies">
            <Film className="w-4 h-4 mr-2" />
            Movies ({movies.length})
          </TabsTrigger>
          <TabsTrigger value="series">
            <Tv className="w-4 h-4 mr-2" />
            Series ({series.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {displayItems.map((item) => {
          const link =
            item.type === "movie"
              ? `/movies/${item.slug}`
              : `/series/${item.slug}`;

          return (
            <div 
              key={item.listItemId} 
              className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Movie/Series Card */}
              <Link href={link}>
                <div className="relative aspect-[2/3] w-full">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />

                  {/* Gradient Overlay (Always visible at bottom) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg pointer-events-none" />

                  {/* Title & Info (Always visible) */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {item.rating.toFixed(1)}
                      </div>
                      <span>•</span>
                      <span>{item.year.value}</span>
                    </div>
                    {item.type === "series" && (
                      <p className="text-xs text-white/60 mt-1">
                        {item.totalSeasons} Season{item.totalSeasons !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <Badge variant={item.type === "movie" ? "default" : "secondary"}>
                      {item.type === "movie" ? (
                        <Film className="w-3 h-3" />
                      ) : (
                        <Tv className="w-3 h-3" />
                      )}
                    </Badge>
                  </div>
                </div>
              </Link>

              {/* Remove Button */}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(item.contentId, item.type)}
                disabled={removingId === item.contentId}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}