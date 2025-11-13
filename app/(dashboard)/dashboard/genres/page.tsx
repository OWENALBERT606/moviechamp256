import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { listGenres } from "@/actions/genres";
import GenreListing from "./components/genre-listing";

export default async function GenresPage() {
  const genresData = await listGenres();
  const genres = genresData.data || [];
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Genres</h1>
          <p className="text-muted-foreground mt-2">
            Manage movie genres and categories
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/genres/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Genre
          </Link>
        </Button>
      </div>

      <GenreListing genres={genres} />
    </div>
  );
}