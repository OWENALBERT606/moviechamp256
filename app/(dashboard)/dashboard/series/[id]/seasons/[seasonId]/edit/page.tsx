import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getSeason } from "@/actions/series";
import { SeasonForm } from "../../../../components/season-form";

export default async function EditSeasonPage({ 
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
          Back to Season
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Season</CardTitle>
          <CardDescription>Update season information</CardDescription>
        </CardHeader>
        <CardContent>
          <SeasonForm seriesId={id} season={seasonData.data} />
        </CardContent>
      </Card>
    </div>
  );
}