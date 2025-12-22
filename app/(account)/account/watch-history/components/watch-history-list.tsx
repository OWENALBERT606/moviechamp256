"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Play } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteWatchHistoryItem, WatchHistoryItem } from "@/actions/watchHistory";

interface WatchHistoryListProps {
  items: WatchHistoryItem[];
  userId: string;
}

export function WatchHistoryList({ items: initialItems, userId }: WatchHistoryListProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    setRemovingId(id);

    const result = await deleteWatchHistoryItem(id);

    if (result.success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Removed from watch history");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to remove");
    }

    setRemovingId(null);
  };

  const getItemDetails = (item: WatchHistoryItem) => {
    if (item.movie) {
      return {
        title: item.movie.title,
        subtitle: "Movie",
        image: item.movie.poster,
        link: `/movies/${item.movie.slug}`,
        type: "movie" as const,
      };
    }

    if (item.episode && item.episode.season?.series) {
      const series = item.episode.season.series;
      return {
        title: series.title,
        subtitle: `S${item.episode.season.seasonNumber} E${item.episode.episodeNumber}`,
        image: series.poster,
        link: `/series/${series.slug}/watch?season=${item.episode.season.seasonNumber}&episode=${item.episode.episodeNumber}`,
        type: "series" as const,
      };
    }

    return null;
  };

  if (items.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">No watch history yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const details = getItemDetails(item);
        if (!details) return null;

        return (
          <Card key={item.id} className="p-4">
            <div className="flex gap-4">
              {/* Thumbnail */}
              <Link href={details.link} className="relative w-32 h-20 flex-shrink-0">
                <Image
                  src={details.image}
                  alt={details.title}
                  fill
                  className="object-cover rounded"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <Link href={details.link}>
                      <h3 className="font-semibold hover:text-orange-500 transition-colors truncate">
                        {details.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{details.subtitle}</p>
                  </div>
                  <Badge variant={details.type === "movie" ? "default" : "secondary"}>
                    {details.type === "movie" ? "Film" : "TV"}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div
                      className="bg-orange-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(item.progressPercent)}% watched
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.lastWatchedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={details.link}>
                      <Play className="w-3 h-3 mr-2" />
                      {item.completed ? "Watch Again" : "Continue"}
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemove(item.id)}
                    disabled={removingId === item.id}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}