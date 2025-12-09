import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getEpisode } from "@/actions/series";
import { EpisodeForm } from "@/app/(dashboard)/dashboard/series/components/episode-form";

export default async function EditEpisodePage({ 
  params 
}: { 
  params: Promise<{ id: string; seasonId: string; episodeId: string }> 
}) {
  const { id, seasonId, episodeId } = await params;
  const episodeData = await getEpisode(episodeId);

  if (!episodeData.success || !episodeData.data) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href={`/dashboard/series/${id}/seasons/${seasonId}/episodes/${episodeId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Episode
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Episode</CardTitle>
          <CardDescription>Update episode information</CardDescription>
        </CardHeader>
        <CardContent>
          <EpisodeForm 
            seriesId={id} 
            seasonId={seasonId} 
            episode={episodeData.data} 
          />
        </CardContent>
      </Card>
    </div>
  );
}