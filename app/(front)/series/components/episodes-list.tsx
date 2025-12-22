// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Play, Check } from "lucide-react";

// interface EpisodesListProps {
//   series: any;
//   currentSeason: any;
//   currentEpisode: any;
// }

// export function EpisodesList({
//   series,
//   currentSeason,
//   currentEpisode,
// }: EpisodesListProps) {
//   const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(
//     currentSeason.seasonNumber
//   );

//   const selectedSeason = series.seasons?.find(
//     (s: any) => s.seasonNumber === selectedSeasonNumber
//   );

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-lg">Episodes</CardTitle>

//         {/* Season Selector */}
//         {series.seasons && series.seasons.length > 1 && (
//           <Select
//             value={selectedSeasonNumber.toString()}
//             onValueChange={(value) => setSelectedSeasonNumber(parseInt(value))}
//           >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               {series.seasons.map((season: any) => (
//                 <SelectItem
//                   key={season.id}
//                   value={season.seasonNumber.toString()}
//                 >
//                   Season {season.seasonNumber}
//                   {season.title && `: ${season.title}`}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         )}
//       </CardHeader>

//       <CardContent className="p-0">
//         <div className="max-h-[600px] overflow-y-auto">
//           {selectedSeason?.episodes?.map((episode: any) => {
//             const isCurrent =
//               episode.id === currentEpisode.id &&
//               selectedSeasonNumber === currentSeason.seasonNumber;

//             return (
//               <Link
//                 key={episode.id}
//                 href={`/series/${series.slug}/watch?season=${selectedSeasonNumber}&episode=${episode.episodeNumber}`}
//               >
//                 <div
//                   className={`flex gap-3 p-3 hover:bg-muted/50 transition-colors border-b border-border ${
//                     isCurrent ? "bg-muted" : ""
//                   }`}
//                 >
//                   {/* Episode Thumbnail */}
//                   <div className="relative w-28 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
//                     {episode.poster ? (
//                       <Image
//                         src={episode.poster}
//                         alt={episode.title}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <Play className="w-6 h-6 text-muted-foreground" />
//                       </div>
//                     )}

//                     {/* Current Episode Badge */}
//                     {isCurrent && (
//                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                         <Badge className="bg-orange-500">
//                           <Play className="w-3 h-3 mr-1 fill-white" />
//                           Playing
//                         </Badge>
//                       </div>
//                     )}

//                     {/* Episode Number */}
//                     <div className="absolute bottom-1 right-1">
//                       <Badge
//                         variant="secondary"
//                         className="bg-black/70 text-white text-xs"
//                       >
//                         {episode.episodeNumber}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Episode Info */}
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-medium text-sm line-clamp-1 mb-1">
//                       {episode.episodeNumber}. {episode.title}
//                     </h4>
//                     {episode.length && (
//                       <p className="text-xs text-muted-foreground">
//                         {episode.length}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Download, Clock } from "lucide-react";
import { toast } from "sonner";

interface EpisodesListProps {
  series: any;
  currentSeason: any;
  currentEpisode: any;
}

export function EpisodesList({
  series,
  currentSeason,
  currentEpisode,
}: EpisodesListProps) {
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(
    currentSeason.seasonNumber
  );

  const selectedSeason = series.seasons?.find(
    (s: any) => s.seasonNumber === selectedSeasonNumber
  );

  const handleDownload = (episode: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const downloadSource = episode.downloadUrl || episode.videoUrl;
    
    if (!downloadSource) {
      toast.error("Download link not available");
      return;
    }

    // Generate filename
    const filename = `${series.title.replace(/[^a-z0-9]/gi, '_')}_S${selectedSeasonNumber.toString().padStart(2, '0')}E${episode.episodeNumber.toString().padStart(2, '0')}.mp4`;

    // Create temporary download link
    const link = document.createElement("a");
    link.href = downloadSource;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Download started", {
      description: `${episode.title}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Episodes</CardTitle>
          
          {selectedSeason?.episodes && (
            <Badge variant="secondary" className="text-xs">
              {selectedSeason.episodes.length} Episodes
            </Badge>
          )}
        </div>

        {/* Season Selector */}
        {series.seasons && series.seasons.length > 1 && (
          <Select
            value={selectedSeasonNumber.toString()}
            onValueChange={(value) => setSelectedSeasonNumber(parseInt(value))}
          >
            <SelectTrigger className="mt-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {series.seasons.map((season: any) => (
                <SelectItem
                  key={season.id}
                  value={season.seasonNumber.toString()}
                >
                  Season {season.seasonNumber}
                  {season.title && `: ${season.title}`}
                  <span className="text-xs text-muted-foreground ml-2">
                    ({season.totalEpisodes} episodes)
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="max-h-[600px] overflow-y-auto">
          {selectedSeason?.episodes?.length > 0 ? (
            selectedSeason.episodes.map((episode: any) => {
              const isCurrent =
                episode.id === currentEpisode.id &&
                selectedSeasonNumber === currentSeason.seasonNumber;

              return (
                <div
                  key={episode.id}
                  className={`flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 ${
                    isCurrent ? "bg-orange-500/10 border-orange-500/30" : ""
                  }`}
                >
                  {/* Episode Thumbnail */}
                  <Link
                    href={`/series/${series.slug}/watch?season=${selectedSeasonNumber}&episode=${episode.episodeNumber}`}
                    className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted group"
                  >
                    {episode.poster ? (
                      <Image
                        src={episode.poster}
                        alt={episode.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}

                    {/* Play Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Current Episode Badge */}
                    {isCurrent && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 text-xs">
                        <Play className="w-3 h-3 mr-1 fill-white" />
                        Now Playing
                      </Badge>
                    )}

                    {/* Episode Number Badge */}
                    {!isCurrent && (
                      <Badge
                        variant="secondary"
                        className="absolute top-2 left-2 bg-black/70 text-white text-xs"
                      >
                        E{episode.episodeNumber}
                      </Badge>
                    )}
                  </Link>

                  {/* Episode Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/series/${series.slug}/watch?season=${selectedSeasonNumber}&episode=${episode.episodeNumber}`}
                    >
                      <h4 className="font-semibold text-sm line-clamp-1 mb-1 hover:text-orange-500 transition-colors">
                        {episode.episodeNumber}. {episode.title}
                      </h4>
                    </Link>
                    
                    {episode.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {episode.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {episode.length && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {episode.length}
                        </div>
                      )}
                      {episode.size && (
                        <>
                          <span>•</span>
                          <span>{episode.size}</span>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-3">
                      <Link
                        href={`/series/${series.slug}/watch?season=${selectedSeasonNumber}&episode=${episode.episodeNumber}`}
                      >
                        <Button
                          size="sm"
                          variant={isCurrent ? "default" : "outline"}
                          className={
                            isCurrent
                              ? "bg-orange-500 hover:bg-orange-600 h-8 text-xs"
                              : "h-8 text-xs"
                          }
                        >
                          <Play className="w-3 h-3 mr-1.5" />
                          {isCurrent ? "Continue" : "Watch"}
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => handleDownload(episode, e)}
                        className="h-8 text-xs hover:bg-orange-500/10 hover:text-orange-500"
                      >
                        <Download className="w-3 h-3 mr-1.5" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>No episodes available for this season</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}