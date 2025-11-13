import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
// import { GenreForm } from "@/components/dashboard/genres/genre-form";
import { getGenre } from "@/actions/genres";
import { GenreForm } from "@/components/back/forms/genre-form";

export default async function EditGenrePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const genreData = await getGenre(id);
  const genre = genreData.data;

  if (!genre) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/dashboard/genres">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Genres
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Genre</CardTitle>
          <CardDescription>Update genre information</CardDescription>
        </CardHeader>
        <CardContent>
          <GenreForm genre={genre} />
        </CardContent>
      </Card>
    </div>
  );
}