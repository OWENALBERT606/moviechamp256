import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ReleaseYearListing from "./components/release-year-listing";
import { listReleaseYears } from "@/actions/releaseYear";

export default async function ReleaseYearsPage() {
  const yearsData = await listReleaseYears();
  const years = yearsData.data || [];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Release Years</h1>
          <p className="text-muted-foreground mt-2">
            Manage movie release years
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/release-years/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Year
          </Link>
        </Button>
      </div>

      <ReleaseYearListing years={years} />
    </div>
  );
}