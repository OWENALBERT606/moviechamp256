import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getMovie } from "@/actions/movies";
import { MovieForm } from "../../components/movie-form";

export default async function EditMoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const movieData = await getMovie(id);
  const movie = movieData.data;

  if (!movie) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/dashboard/movies">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Movies
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Movie</CardTitle>
          <CardDescription>Update movie information</CardDescription>
        </CardHeader>
        <CardContent>
          <MovieForm movie={movie} />
        </CardContent>
      </Card>
    </div>
  );
}