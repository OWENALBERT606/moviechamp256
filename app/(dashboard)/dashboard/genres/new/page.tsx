import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { GenreForm } from "@/components/back/forms/genre-form";

export default function NewGenrePage() {
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
          <CardTitle>Create Genre</CardTitle>
          <CardDescription>Add a new movie genre to your collection</CardDescription>
        </CardHeader>
        <CardContent>
          <GenreForm />
        </CardContent>
      </Card>
    </div>
  );
}