import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getVJ } from "@/actions/vjs";
import { VJForm } from "../../components/vj-form";

export default async function EditVJPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const vjData = await getVJ(id);
  const vj = vjData.data;

  if (!vj) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/dashboard/vjs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to VJs
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit VJ</CardTitle>
          <CardDescription>Update VJ information</CardDescription>
        </CardHeader>
        <CardContent>
          <VJForm vj={vj} />
        </CardContent>
      </Card>
    </div>
  );
}