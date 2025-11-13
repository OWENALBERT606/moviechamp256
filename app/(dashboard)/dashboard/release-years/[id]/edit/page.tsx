import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getReleaseYear } from "@/actions/releaseYear";
import { ReleaseYearForm } from "../../components/release-year-form";
export default async function EditReleaseYearPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const yearData = await getReleaseYear(id);
  const year = yearData.data;

  if (!year) {
    notFound();
  }

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
          <CardTitle>Edit Release Year</CardTitle>
          <CardDescription>Update release year information</CardDescription>
        </CardHeader>
        <CardContent>
          <ReleaseYearForm year={year} />
        </CardContent>
      </Card>
    </div>
  );
}