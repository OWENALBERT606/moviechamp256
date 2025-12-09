import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getSeries } from "@/actions/series";
import { SeriesForm } from "../../components/series-form";

export default async function EditSeriesPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const seriesData = await getSeries(id);

  if (!seriesData.success || !seriesData.data) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/dashboard/series">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Series
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Series</CardTitle>
          <CardDescription>Update series information</CardDescription>
        </CardHeader>
        <CardContent>
          <SeriesForm series={seriesData.data} />
        </CardContent>
      </Card>
    </div>
  );
}