import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { listVJs } from "@/actions/vjs";
import VJListing from "./components/vj-listing";

export default async function VJsPage() {
  const vjsData = await listVJs();
  const vjs = vjsData.data || [];

  console.log(vjs);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">VJs</h1>
          <p className="text-muted-foreground mt-2">
            Manage video jockeys and content creators
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/vjs/new">
            <Plus className="mr-2 h-4 w-4" />
            Add VJ
          </Link>
        </Button>
      </div>

      <VJListing vjs={vjs} />
    </div>
  );
}