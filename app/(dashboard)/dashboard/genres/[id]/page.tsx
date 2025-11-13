import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Pencil } from "lucide-react";
import { getGenre } from "@/actions/genres";
import { DeleteGenreButton } from "../components/delete-genre-button";
import { formatDate } from "@/lib/format-date";

export default async function GenreDetailPage({
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

  const movieCount = genre._count?.movies || 0;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard/genres">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Genres
          </Link>
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">{genre.name}</h1>
            <p className="text-xl text-muted-foreground">
              {genre.description || "No description provided"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/genres/${genre.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <DeleteGenreButton genre={genre} variant="outline" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Movies Count</CardTitle>
            <CardDescription>Total movies in this genre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{movieCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Genre availability</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={movieCount > 0 ? "default" : "secondary"} className="text-lg px-4 py-2">
              {movieCount > 0 ? "Active" : "Empty"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Genre Details</CardTitle>
          <CardDescription>Complete information about this genre</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Name</div>
              <div className="text-lg font-semibold">{genre.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Slug</div>
              <div>
                <Badge variant="secondary" className="text-sm font-mono">
                  {genre.slug}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Description</div>
            <div className="text-base">
              {genre.description || (
                <span className="text-muted-foreground italic">No description provided</span>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Movies</div>
            <div className="text-lg font-semibold">{movieCount} movie(s)</div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Created</div>
              <div className="text-sm">{formatDate(genre.createdAt)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Last Updated</div>
              <div className="text-sm">{formatDate(genre.updatedAt)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}