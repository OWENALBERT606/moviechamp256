import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Star, Eye } from "lucide-react";
import type { Series } from "@/actions/series";

interface SeriesHeroProps {
  series: Series;
}

export function SeriesHero({ series }: SeriesHeroProps) {
  const viewsCount = Number(series.viewsCount || 0);

  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={series.trailerPoster || series.poster}
          alt={series.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-12 lg:px-24">
          <div className="max-w-2xl space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {series.isTrending && (
                <Badge className="bg-red-600">🔥 Trending</Badge>
              )}
              {series.isComingSoon && (
                <Badge className="bg-blue-600">Coming Soon</Badge>
              )}
              <Badge variant="outline">{series.genre.name}</Badge>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
              {series.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-lg">{series.rating.toFixed(1)}</span>
              </div>
              <span className="text-lg">{series.year.value}</span>
              <span className="text-lg">
                {series.totalSeasons} Season{series.totalSeasons !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span className="text-lg">{viewsCount.toLocaleString()}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-white/90 line-clamp-3 leading-relaxed">
              {series.description}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8"
                asChild
              >
                <Link href={`/series/${series.slug}`}>
                  <Play className="w-5 h-5 mr-2 fill-white" />
                  {series.isComingSoon ? "View Details" : "Watch Now"}
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8"
              >
                <Plus className="w-5 h-5 mr-2" />
                My List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}