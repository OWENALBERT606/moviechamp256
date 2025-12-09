import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { SeriesForm } from "../components/series-form";

export default function NewSeriesPage() {
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
          <CardTitle>Add Series</CardTitle>
          <CardDescription>Add a new TV series to your collection</CardDescription>
        </CardHeader>
        <CardContent>
          <SeriesForm />
        </CardContent>
      </Card>
    </div>
  );
}