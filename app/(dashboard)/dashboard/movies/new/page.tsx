import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { MovieForm } from "../components/movie-form";

export default function NewMoviePage() {
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
          <CardTitle>Add Movie</CardTitle>
          <CardDescription>Add a new movie to your collection</CardDescription>
        </CardHeader>
        <CardContent>
          <MovieForm />
        </CardContent>
      </Card>
    </div>
  );
}