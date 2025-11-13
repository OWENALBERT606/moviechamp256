import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { ReleaseYearForm } from "../components/release-year-form";

export default function NewReleaseYearPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/dashboard/release-years">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Release Years
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add Release Year</CardTitle>
          <CardDescription>Add a new release year to your collection</CardDescription>
        </CardHeader>
        <CardContent>
          <ReleaseYearForm />
        </CardContent>
      </Card>
    </div>
  );
}