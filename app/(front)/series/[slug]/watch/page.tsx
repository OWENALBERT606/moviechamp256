import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getSeriesBySlug, getNextEpisode, getPreviousEpisode } from "@/actions/series";
import { LoadingPlayer } from "../../components/loading-player";
import { EpisodePlayer } from "../../components/episode-player";
import { EpisodeInfo } from "../../components/episode-info";
import { EpisodesList } from "../../components/episodes-list";

export default async function WatchEpisodePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ season?: string; episode?: string }>;
}) {
  const { slug } = await params;
  const { season: seasonParam, episode: episodeParam } = await searchParams;

  const seriesData = await getSeriesBySlug(slug);

  if (!seriesData.success || !seriesData.data) {
    notFound();
  }

  const series = seriesData.data;

  // Parse season and episode numbers
  const seasonNumber = seasonParam ? parseInt(seasonParam) : 1;
  const episodeNumber = episodeParam ? parseInt(episodeParam) : 1;

  // Find the season
  const season = series.seasons?.find((s) => s.seasonNumber === seasonNumber);

  if (!season) {
    notFound();
  }

  // Find the episode
  const episode = season.episodes?.find(
    (e) => e.episodeNumber === episodeNumber
  );

  if (!episode) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <Suspense fallback={<LoadingPlayer />}>
        <EpisodePlayer episode={episode} series={series} season={season} />
      </Suspense>

      <div className="container mx-auto px-4 md:px-12 lg:px-24 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <EpisodeInfo episode={episode} series={series} season={season} />
          </div>

          {/* Episodes List Sidebar */}
          <div>
            <EpisodesList
              series={series}
              currentSeason={season}
              currentEpisode={episode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}