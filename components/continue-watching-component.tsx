// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Play, MoreHorizontal, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { WatchHistoryItem } from "@/actions/watchHistory";


// interface ContinueWatchingContentProps {
//   items: WatchHistoryItem[];
//   userId: string;
// }

// export function ContinueWatchingContent({ 
//   items: initialItems, 
//   userId 
// }: ContinueWatchingContentProps) {
//   const router = useRouter();
//   const [items, setItems] = useState(initialItems);
//   const [removingId, setRemovingId] = useState<string | null>(null);

//   const handleRemove = async (id: string, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     setRemovingId(id);
    
//     const result = await deleteWatchHistoryItem(id);
    
//     if (result.success) {
//       setItems((prev) => prev.filter((item) => item.id !== id));
//       toast.success("Removed from continue watching");
//       router.refresh();
//     } else {
//       toast.error(result.error || "Failed to remove");
//     }
    
//     setRemovingId(null);
//   };

//   const formatTimeLeft = (currentTime: number, duration: number) => {
//     const remaining = duration - currentTime;
//     const hours = Math.floor(remaining / 3600);
//     const minutes = Math.floor((remaining % 3600) / 60);

//     if (hours > 0) {
//       return `${hours}h ${minutes}min left`;
//     }
//     return `${minutes} min left`;
//   };

//   const getItemDetails = (item: WatchHistoryItem) => {
//     if (item.movie) {
//       return {
//         title: item.movie.title,
//         subtitle: "Movie",
//         image: item.movie.poster,
//         link: `/movies/${item.movie.slug}`,
//       };
//     }

//     if (item.episode && item.episode.season?.series) {
//       const series = item.episode.season.series;
//       return {
//         title: series.title,
//         subtitle: `S${item.episode.season.seasonNumber} E${item.episode.episodeNumber}`,
//         image: series.poster,
//         link: `/series/${series.slug}/watch?season=${item.episode.season.seasonNumber}&episode=${item.episode.episodeNumber}`,
//       };
//     }

//     return null;
//   };

//   if (items.length === 0) {
//     return null;
//   }

//   return (
//     <section className="mt-8">
//       <h2 className="text-2xl font-bold mb-6 text-foreground">Continue Watching</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {items.map((item) => {
//           const details = getItemDetails(item);
//           if (!details) return null;

//           return (
//             <div key={item.id} className="group relative">
//               <div className="relative overflow-hidden rounded-lg bg-card">
//                 <Link href={details.link}>
//                   <div className="relative h-48 w-full">
//                     <Image
//                       src={details.image}
//                       alt={details.title}
//                       fill
//                       className="object-cover transition-transform duration-300 group-hover:scale-105"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     />
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted/30">
//                     <div
//                       className="h-full bg-orange-500 transition-all duration-300"
//                       style={{ width: `${item.progressPercent}%` }}
//                     />
//                   </div>

//                   {/* Play Button Overlay */}
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                     <Button
//                       size="lg"
//                       className="bg-orange-500 hover:bg-orange-600 rounded-full h-16 w-16 shadow-2xl"
//                     >
//                       <Play className="w-8 h-8 fill-white" />
//                     </Button>
//                   </div>
//                 </Link>

//                 {/* More Options */}
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-white"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                       }}
//                       disabled={removingId === item.id}
//                     >
//                       <MoreHorizontal className="w-4 h-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="w-56">
//                     <DropdownMenuItem
//                       onClick={(e) => handleRemove(item.id, e)}
//                       className="text-destructive focus:text-destructive cursor-pointer"
//                       disabled={removingId === item.id}
//                     >
//                       <Trash2 className="w-4 h-4 mr-2" />
//                       {removingId === item.id ? "Removing..." : "Remove from Continue Watching"}
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>

//               {/* Item Info */}
//               <div className="mt-3 space-y-1">
//                 <h3 className="font-semibold text-foreground group-hover:text-orange-500 transition-colors line-clamp-2">
//                   {details.title}
//                 </h3>
//                 <div className="flex items-center justify-between text-sm text-muted-foreground">
//                   <span className="font-medium">{details.subtitle}</span>
//                   <span>{formatTimeLeft(item.currentTime, item.duration)}</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }




"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteWatchHistoryItem, WatchHistoryItem } from "@/actions/watchHistory";

interface ContinueWatchingContentProps {
  items: WatchHistoryItem[];
  userId: string;
}

export function ContinueWatchingContent({ 
  items: initialItems, 
  userId 
}: ContinueWatchingContentProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setRemovingId(id);
    
    const result = await deleteWatchHistoryItem(id);
    
    if (result.success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Removed from continue watching");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to remove");
    }
    
    setRemovingId(null);
  };

  const formatTimeLeft = (currentTime: number, duration: number) => {
    const remaining = duration - currentTime;
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}min left`;
    }
    return `${minutes} min left`;
  };

  const getItemDetails = (item: WatchHistoryItem) => {
    if (item.movie) {
      return {
        title: item.movie.title,
        subtitle: "Movie",
        image: item.movie.poster,
        link: `/movies/${item.movie.slug}`,
      };
    }

    if (item.episode && item.episode.season?.series) {
      const series = item.episode.season.series;
      return {
        title: series.title,
        subtitle: `S${item.episode.season.seasonNumber} E${item.episode.episodeNumber}`,
        image: series.poster,
        link: `/series/${series.slug}/watch?season=${item.episode.season.seasonNumber}&episode=${item.episode.episodeNumber}`,
      };
    }

    return null;
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Continue Watching</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const details = getItemDetails(item);
          if (!details) return null;

          return (
            <div key={item.id} className="group relative">
              <div className="relative overflow-hidden rounded-lg bg-card">
                <Link href={details.link}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={details.image}
                      alt={details.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted/30">
                    <div
                      className="h-full bg-orange-500 transition-all duration-300"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 rounded-full h-16 w-16 shadow-2xl"
                    >
                      <Play className="w-8 h-8 fill-white" />
                    </Button>
                  </div>
                </Link>

                {/* More Options */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      disabled={removingId === item.id}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem
                      onClick={(e) => handleRemove(item.id, e)}
                      className="text-destructive focus:text-destructive cursor-pointer"
                      disabled={removingId === item.id}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {removingId === item.id ? "Removing..." : "Remove from Continue Watching"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Item Info */}
              <div className="mt-3 space-y-1">
                <h3 className="font-semibold text-foreground group-hover:text-orange-500 transition-colors line-clamp-2">
                  {details.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-medium">{details.subtitle}</span>
                  <span>{formatTimeLeft(item.currentTime, item.duration)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
