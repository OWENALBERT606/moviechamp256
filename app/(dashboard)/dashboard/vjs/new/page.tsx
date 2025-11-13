import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { VJForm } from "../components/vj-form";

export default function NewVJPage() {
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
          <CardTitle>Add VJ</CardTitle>
          <CardDescription>Add a new video jockey to your collection</CardDescription>
        </CardHeader>
        <CardContent>
          <VJForm />
        </CardContent>
      </Card>
    </div>
  );
}