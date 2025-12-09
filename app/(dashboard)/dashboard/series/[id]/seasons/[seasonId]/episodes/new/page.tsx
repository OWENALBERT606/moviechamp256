import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getSeason } from "@/actions/series";
import { EpisodeForm } from "@/app/(dashboard)/dashboard/series/components/episode-form";

export default async function NewEpisodePage({ 
  params 
}: { 
  params: Promise<{ id: string; seasonId: string }> 
}) {
  const { id, seasonId } = await params;
  const seasonData = await getSeason(seasonId);

  if (!seasonData.success || !seasonData.data) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href={`/dashboard/series/${id}/seasons/${seasonId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Season {seasonData.data.seasonNumber}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add Episode</CardTitle>
          <CardDescription>
            Add a new episode to Season {seasonData.data.seasonNumber}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EpisodeForm seriesId={id} seasonId={seasonId} />
        </CardContent>
      </Card>
    </div>
  );
}