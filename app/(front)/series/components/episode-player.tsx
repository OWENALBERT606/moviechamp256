"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  SkipBack,
  SkipForward,
  Settings,
  Maximize,
  Volume2,
} from "lucide-react";
import { incrementEpisodeViews } from "@/actions/series";

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

  const hasPrevious =
    episode.episodeNumber > 1 || season.seasonNumber > 1;
  const hasNext =
    episode.episodeNumber < season.totalEpisodes ||
    season.seasonNumber < series.totalSeasons;

  return (
    <div className="relative bg-black">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href={`/series/${series.slug}`}>
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
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

      {/* Episode Controls */}
      <div className="bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousEpisode}
                disabled={!hasPrevious}
                className="hover:bg-white/20"
              >
                <SkipBack className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextEpisode}
                disabled={!hasNext}
                className="hover:bg-white/20"
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">
                S{season.seasonNumber}:E{episode.episodeNumber}
              </span>
              <span className="text-sm text-white/70">•</span>
              <span className="text-sm">{episode.title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}