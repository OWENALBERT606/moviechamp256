

import { getSession } from "@/actions/auth";
import { getComingSoonMovies, getTrendingMovies, listMovies } from "@/actions/movies";
import { getComingSoonSeries, getTrendingSeries, listSeries } from "@/actions/series";
import { ComingSoon } from "@/components/front-end/coming-soon";
import { ContinueWatching } from "@/components/front-end/continue-watching";
import { GenreFilter } from "@/components/front-end/genre-filter";
import { HeroCarousel } from "@/components/front-end/hero-couresel";
import { MovieSection } from "@/components/front-end/movie-section";
import { Pricing } from "@/components/front-end/pricing";
import { SeriesSection } from "@/components/series-component";

export default async function HomePage() {
   const session = await getSession();  
    const user = session?.user;
  // Fetch all movie and series categories in parallel
  const [
    trendingMoviesData,
    comingSoonMoviesData,
    allMoviesData,
    trendingSeriesData,
    comingSoonSeriesData,
    allSeriesData,
  ] = await Promise.all([
    getTrendingMovies(10),
    getComingSoonMovies(10),
    listMovies({ limit: 50 }),
    getTrendingSeries(10),
    getComingSoonSeries(10),
    listSeries({ limit: 50 }),
  ]);

  // Extract movie data
  const trendingMovies = trendingMoviesData.data || [];
  const comingSoonMovies = comingSoonMoviesData.data || [];
  const allMovies = allMoviesData.data || [];

  // Extract series data
  const trendingSeries = trendingSeriesData.data || [];
  const comingSoonSeries = comingSoonSeriesData.data || [];
  const allSeries = allSeriesData.data || [];

  // Filter movies (exclude coming soon)
  const comingSoonMovieIds = new Set(comingSoonMovies.map((movie) => movie.id));
  const availableMovies = allMovies.filter((movie) => !comingSoonMovieIds.has(movie.id));
  const availableTrendingMovies = trendingMovies.filter(
    (movie) => !comingSoonMovieIds.has(movie.id)
  );

  // Filter series (exclude coming soon)
  const comingSoonSeriesIds = new Set(comingSoonSeries.map((series) => series.id));
  const availableSeries = allSeries.filter((series) => !comingSoonSeriesIds.has(series.id));
  const availableTrendingSeries = trendingSeries.filter(
    (series) => !comingSoonSeriesIds.has(series.id)
  );

  // Filter movies by genre
  const actionMovies = availableMovies
    .filter((movie) => movie.genre.name.toLowerCase().includes("action"))
    .slice(0, 10);

  const dramaMovies = availableMovies
    .filter((movie) => movie.genre.name.toLowerCase().includes("drama"))
    .slice(0, 10);

  const thrillerMovies = availableMovies
    .filter((movie) => movie.genre.name.toLowerCase().includes("thriller"))
    .slice(0, 10);

  // Filter series by genre
  const actionSeries = availableSeries
    .filter((series) => series.genre.name.toLowerCase().includes("action"))
    .slice(0, 10);

  const dramaSeries = availableSeries
    .filter((series) => series.genre.name.toLowerCase().includes("drama"))
    .slice(0, 10);

  const comedySeries = availableSeries
    .filter((series) => series.genre.name.toLowerCase().includes("comedy"))
    .slice(0, 10);

  // New releases
  const newMovies = [...availableMovies]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const newSeries = [...availableSeries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  // Hero carousel - combine top trending movies and series
  const heroItems = [
    ...availableTrendingMovies.slice(0, 3),
    ...availableTrendingSeries.slice(0, 2),
  ].slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <HeroCarousel items={heroItems} />
      <main className="px-4 md:px-12 lg:px-24">
        <div className="px-4 md:px-8 lg:px-12 space-y-12 pb-12">
          <ContinueWatching />
          <GenreFilter />
          
          {/* Trending Section - Mix of Movies and Series */}
          {availableTrendingMovies.length > 0 && (
            <MovieSection title="🔥 Trending Movies" movies={availableTrendingMovies} />
          )}
          
          {availableTrendingSeries.length > 0 && (
            <SeriesSection title="🔥 Trending TV Series" series={availableTrendingSeries} />
          )}

          {/* Genre Sections - Movies */}
          {actionMovies.length > 0 && (
            <MovieSection title="💥 Action Movies" movies={actionMovies} />
          )}

          {/* Genre Sections - Series */}
          {dramaSeries.length > 0 && (
            <SeriesSection title="🎭 Drama Series" series={dramaSeries} />
          )}

          {thrillerMovies.length > 0 && (
            <MovieSection title="😱 Thriller Movies" movies={thrillerMovies} />
          )}

          {actionSeries.length > 0 && (
            <SeriesSection title="💥 Action Series" series={actionSeries} />
          )}

          {comedySeries.length > 0 && (
            <SeriesSection title="😂 Comedy Series" series={comedySeries} />
          )}

          {dramaMovies.length > 0 && (
            <MovieSection title="🎬 Drama Movies" movies={dramaMovies} />
          )}

          {/* New Releases */}
          {newSeries.length > 0 && (
            <SeriesSection title="🆕 New TV Series" series={newSeries} />
          )}

          {newMovies.length > 0 && (
            <MovieSection title="🆕 New Movie Releases" movies={newMovies} />
          )}

          {/* Coming Soon - Combined */}
          {(comingSoonMovies.length > 0 || comingSoonSeries.length > 0) && (
            <ComingSoon movies={comingSoonMovies} series={comingSoonSeries} />
          )}
        </div>
        <Pricing />
      </main>
    </div>
  );
}