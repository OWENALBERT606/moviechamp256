import { listSeries } from "@/actions/series";
import Link from "next/link";

export default async function TestSeriesPage() {
  const seriesData = await listSeries();
  const series = seriesData.data || [];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">All Series Slugs</h1>
      <div className="space-y-4">
        {series.map((s) => (
          <div key={s.id} className="p-4 border rounded-lg">
            <div className="font-bold">{s.title}</div>
            <div className="text-sm text-muted-foreground">ID: {s.id}</div>
            <div className="text-sm text-muted-foreground">Slug: {s.slug}</div>
            <Link 
              href={`/series/${s.slug}`}
              className="text-blue-500 hover:underline text-sm"
            >
              → Visit /series/{s.slug}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}