"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Check } from "lucide-react";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Episodes</CardTitle>

        {/* Season Selector */}
        {series.seasons && series.seasons.length > 1 && (
          <Select
            value={selectedSeasonNumber.toString()}
            onValueChange={(value) => setSelectedSeasonNumber(parseInt(value))}
          >
            <SelectTrigger>
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
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="max-h-[600px] overflow-y-auto">
          {selectedSeason?.episodes?.map((episode: any) => {
            const isCurrent =
              episode.id === currentEpisode.id &&
              selectedSeasonNumber === currentSeason.seasonNumber;

            return (
              <Link
                key={episode.id}
                href={`/series/${series.slug}/watch?season=${selectedSeasonNumber}&episode=${episode.episodeNumber}`}
              >
                <div
                  className={`flex gap-3 p-3 hover:bg-muted/50 transition-colors border-b border-border ${
                    isCurrent ? "bg-muted" : ""
                  }`}
                >
                  {/* Episode Thumbnail */}
                  <div className="relative w-28 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                    {episode.poster ? (
                      <Image
                        src={episode.poster}
                        alt={episode.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}

                    {/* Current Episode Badge */}
                    {isCurrent && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge className="bg-orange-500">
                          <Play className="w-3 h-3 mr-1 fill-white" />
                          Playing
                        </Badge>
                      </div>
                    )}

                    {/* Episode Number */}
                    <div className="absolute bottom-1 right-1">
                      <Badge
                        variant="secondary"
                        className="bg-black/70 text-white text-xs"
                      >
                        {episode.episodeNumber}
                      </Badge>
                    </div>
                  </div>

                  {/* Episode Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1 mb-1">
                      {episode.episodeNumber}. {episode.title}
                    </h4>
                    {episode.length && (
                      <p className="text-xs text-muted-foreground">
                        {episode.length}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}