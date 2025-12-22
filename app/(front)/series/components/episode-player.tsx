// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowLeft,
//   SkipBack,
//   SkipForward,
//   Settings,
//   Maximize,
//   Volume2,
// } from "lucide-react";
// import { incrementEpisodeViews } from "@/actions/series";

// interface EpisodePlayerProps {
//   episode: any;
//   series: any;
//   season: any;
// }

// export function EpisodePlayer({ episode, series, season }: EpisodePlayerProps) {
//   const router = useRouter();
//   const [hasTrackedView, setHasTrackedView] = useState(false);

//   // Track view after 30 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!hasTrackedView) {
//         incrementEpisodeViews(episode.id).catch(console.error);
//         setHasTrackedView(true);
//       }
//     }, 30000);

//     return () => clearTimeout(timer);
//   }, [episode.id, hasTrackedView]);

//   const handlePreviousEpisode = () => {
//     if (episode.episodeNumber > 1) {
//       router.push(
//         `/series/${series.slug}/watch?season=${season.seasonNumber}&episode=${
//           episode.episodeNumber - 1
//         }`
//       );
//     } else if (season.seasonNumber > 1) {
//       // Go to last episode of previous season
//       const prevSeason = series.seasons?.find(
//         (s: any) => s.seasonNumber === season.seasonNumber - 1
//       );
//       if (prevSeason) {
//         router.push(
//           `/series/${series.slug}/watch?season=${prevSeason.seasonNumber}&episode=${prevSeason.totalEpisodes}`
//         );
//       }
//     }
//   };

//   const handleNextEpisode = () => {
//     if (episode.episodeNumber < season.totalEpisodes) {
//       router.push(
//         `/series/${series.slug}/watch?season=${season.seasonNumber}&episode=${
//           episode.episodeNumber + 1
//         }`
//       );
//     } else {
//       // Go to first episode of next season
//       const nextSeason = series.seasons?.find(
//         (s: any) => s.seasonNumber === season.seasonNumber + 1
//       );
//       if (nextSeason) {
//         router.push(
//           `/series/${series.slug}/watch?season=${nextSeason.seasonNumber}&episode=1`
//         );
//       }
//     }
//   };

//   const hasPrevious =
//     episode.episodeNumber > 1 || season.seasonNumber > 1;
//   const hasNext =
//     episode.episodeNumber < season.totalEpisodes ||
//     season.seasonNumber < series.totalSeasons;

//   return (
//     <div className="relative bg-black">
//       {/* Back Button */}
//       <div className="absolute top-4 left-4 z-50">
//         <Link href={`/series/${series.slug}`}>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back
//           </Button>
//         </Link>
//       </div>

//       {/* Video Player */}
//       <div className="relative aspect-video w-full bg-black">
//         <video
//           src={episode.videoUrl}
//           controls
//           autoPlay
//           className="w-full h-full"
//           poster={episode.poster || season.poster || series.poster}
//           controlsList="nodownload"
//         >
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       {/* Episode Controls */}
//       <div className="bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0 p-6">
//         <div className="container mx-auto">
//           <div className="flex items-center justify-between text-white">
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handlePreviousEpisode}
//                 disabled={!hasPrevious}
//                 className="hover:bg-white/20"
//               >
//                 <SkipBack className="w-5 h-5" />
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleNextEpisode}
//                 disabled={!hasNext}
//                 className="hover:bg-white/20"
//               >
//                 <SkipForward className="w-5 h-5" />
//               </Button>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-sm">
//                 S{season.seasonNumber}:E{episode.episodeNumber}
//               </span>
//               <span className="text-sm text-white/70">•</span>
//               <span className="text-sm">{episode.title}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  SkipBack,
  SkipForward,
  Download,
  Maximize,
} from "lucide-react";
import { incrementEpisodeViews } from "@/actions/series";
import { toast } from "sonner";

interface EpisodePlayerProps {
  episode: any;
  series: any;
  season: any;
}

export function EpisodePlayer({ episode, series, season }: EpisodePlayerProps) {
  const router = useRouter();
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Track view after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTrackedView) {
        incrementEpisodeViews(episode.id).catch(console.error);
        setHasTrackedView(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [episode.id, hasTrackedView]);

  const handlePreviousEpisode = () => {
    if (episode.episodeNumber > 1) {
      router.push(
        `/series/${series.slug}/watch?season=${season.seasonNumber}&episode=${
          episode.episodeNumber - 1
        }`
      );
    } else if (season.seasonNumber > 1) {
      // Go to last episode of previous season
      const prevSeason = series.seasons?.find(
        (s: any) => s.seasonNumber === season.seasonNumber - 1
      );
      if (prevSeason) {
        router.push(
          `/series/${series.slug}/watch?season=${prevSeason.seasonNumber}&episode=${prevSeason.totalEpisodes}`
        );
      }
    }
  };

  const handleNextEpisode = () => {
    if (episode.episodeNumber < season.totalEpisodes) {
      router.push(
        `/series/${series.slug}/watch?season=${season.seasonNumber}&episode=${
          episode.episodeNumber + 1
        }`
      );
    } else {
      // Go to first episode of next season
      const nextSeason = series.seasons?.find(
        (s: any) => s.seasonNumber === season.seasonNumber + 1
      );
      if (nextSeason) {
        router.push(
          `/series/${series.slug}/watch?season=${nextSeason.seasonNumber}&episode=1`
        );
      }
    }
  };

  const handleDownload = () => {
    // Check if downloadUrl exists
    const downloadSource = episode.downloadUrl || episode.videoUrl;
    
    if (!downloadSource) {
      toast.error("Download link not available");
      return;
    }

    // Create filename
    const filename = `${series.title.replace(/[^a-z0-9]/gi, '_')}_S${season.seasonNumber.toString().padStart(2, '0')}E${episode.episodeNumber.toString().padStart(2, '0')}.mp4`;

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = downloadSource;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Download started", {
      description: `${series.title} - S${season.seasonNumber}E${episode.episodeNumber}`,
    });
  };

  const hasPrevious = episode.episodeNumber > 1 || season.seasonNumber > 1;
  const hasNext =
    episode.episodeNumber < season.totalEpisodes ||
    season.seasonNumber < series.totalSeasons;

  return (
    <div className="relative bg-black min-h-screen">
      {/* Top Controls Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link href={`/series/${series.slug}`}>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Series
              </Button>
            </Link>

            {/* Episode Info */}
            <div className="hidden md:flex items-center gap-2 text-white">
              <span className="font-semibold">{series.title}</span>
              <span className="text-white/70">•</span>
              <span className="text-sm">
                Season {season.seasonNumber} Episode {episode.episodeNumber}
              </span>
            </div>

            {/* Download Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative aspect-video w-full bg-black">
        <video
          src={episode.videoUrl}
          controls
          autoPlay
          className="w-full h-full"
          poster={episode.poster || season.poster || series.poster}
          controlsList="nodownload"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Bottom Episode Controls */}
      <div className="bg-gradient-to-t from-black via-black/90 to-transparent px-4 md:px-8 lg:px-12 py-6">
        <div className="container mx-auto">
          {/* Episode Title & Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {episode.title}
            </h2>
            {episode.description && (
              <p className="text-sm text-white/70 line-clamp-3 max-w-4xl">
                {episode.description}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Previous Episode */}
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousEpisode}
                disabled={!hasPrevious}
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipBack className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {/* Next Episode */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextEpisode}
                disabled={!hasNext}
                className="bg-orange-500 hover:bg-orange-600 border-orange-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <SkipForward className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Episode Counter */}
            <div className="hidden md:flex items-center gap-4 text-white text-sm">
              <div className="flex items-center gap-2">
                <span className="text-white/70">Season:</span>
                <span className="font-semibold">{season.seasonNumber}</span>
              </div>
              <span className="text-white/30">|</span>
              <div className="flex items-center gap-2">
                <span className="text-white/70">Episode:</span>
                <span className="font-semibold">
                  {episode.episodeNumber} of {season.totalEpisodes}
                </span>
              </div>
              {episode.length && (
                <>
                  <span className="text-white/30">|</span>
                  <span className="text-white/70">{episode.length}</span>
                </>
              )}
            </div>
          </div>

          {/* Mobile Episode Counter */}
          <div className="md:hidden mt-4 flex items-center justify-between text-white text-sm">
            <span>
              S{season.seasonNumber}:E{episode.episodeNumber} of {season.totalEpisodes}
            </span>
            {episode.length && <span className="text-white/70">{episode.length}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}