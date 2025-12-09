import { listSeries, getTrendingSeries, getComingSoonSeries } from "@/actions/series";
import { SeriesHero } from "./components/series-hero";
import { SeriesSection } from "./components/series-section";
import { SeriesGrid } from "./components/series-grid";


export default async function SeriesPage() {
  const [allSeriesData, trendingData, comingSoonData] = await Promise.all([
    listSeries({ limit: 50 }),
    getTrendingSeries(10),
    getComingSoonSeries(10),
  ]);

  const allSeries = allSeriesData.data || [];
  const trendingSeries = trendingData.data || [];
  const comingSoonSeries = comingSoonData.data || [];

  console.log(allSeries)

  // Get featured series (first trending or first series)
  const featuredSeries = trendingSeries[0] || allSeries[0];

  // Filter by genre
  const actionSeries = allSeries
    .filter((s) => s.genre.name.toLowerCase().includes("action"))
    .slice(0, 10);

  const dramaSeries = allSeries
    .filter((s) => s.genre.name.toLowerCase().includes("drama"))
    .slice(0, 10);

  const comedySeries = allSeries
    .filter((s) => s.genre.name.toLowerCase().includes("comedy"))
    .slice(0, 10);

  // Sort by newest
  const newSeries = [...allSeries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <SeriesHero series={featuredSeries} />

      {/* Series Sections */}
      <main className="px-4 md:px-12 lg:px-24">
        <div className="px-4 md:px-8 lg:px-12 space-y-12 pb-12">
          {/* Trending Series */}
          {trendingSeries.length > 0 && (
            <SeriesSection title="🔥 Trending Series" series={trendingSeries} />
          )}

          {/* Action Series */}
          {actionSeries.length > 0 && (
            <SeriesSection title="💥 Action Series" series={actionSeries} />
          )}

          {/* Drama Series */}
          {dramaSeries.length > 0 && (
            <SeriesSection title="🎭 Drama Series" series={dramaSeries} />
          )}

          {/* Comedy Series */}
          {comedySeries.length > 0 && (
            <SeriesSection title="😂 Comedy Series" series={comedySeries} />
          )}

          {/* New Series */}
          {newSeries.length > 0 && (
            <SeriesSection title="🆕 New Series" series={newSeries} />
          )}

          {/* Coming Soon */}
          {comingSoonSeries.length > 0 && (
            <SeriesSection title="📅 Coming Soon" series={comingSoonSeries} />
          )}

          {/* All Series Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All TV Series</h2>
            <SeriesGrid series={allSeries} />
          </div>
        </div>
      </main>
    </div>
  );
}