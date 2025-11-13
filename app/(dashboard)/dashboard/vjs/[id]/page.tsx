import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Pencil } from "lucide-react";
import { getVJ } from "@/actions/vjs";
import { formatDate } from "@/lib/format-date";
import { DeleteVJButton } from "../components/delete-vj-button";

export default async function VJDetailPage({
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

  const movieCount = vj._count?.movies || 0;
  const initials = vj.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard/vjs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to VJs
          </Link>
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={vj.avatarUrl} alt={vj.name} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">{vj.name}</h1>
              <p className="text-xl text-muted-foreground">
                {vj.bio || "No bio provided"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/vjs/${vj.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <DeleteVJButton vj={vj} variant="outline" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Movies Count</CardTitle>
            <CardDescription>Total movies by this VJ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{movieCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>VJ availability</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={movieCount > 0 ? "default" : "secondary"} className="text-lg px-4 py-2">
              {movieCount > 0 ? "Active" : "Inactive"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>VJ Details</CardTitle>
          <CardDescription>Complete information about this VJ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={vj.avatarUrl} alt={vj.name} />
              <AvatarFallback className="text-xl">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Name</div>
              <div className="text-lg font-semibold">{vj.name}</div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Bio</div>
            <div className="text-base">
              {vj.bio || (
                <span className="text-muted-foreground italic">No bio provided</span>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Avatar URL</div>
            <div className="text-sm font-mono bg-muted p-2 rounded break-all">
              {vj.avatarUrl}
            </div>
          </div>

          <Separator />

          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Movies</div>
            <div className="text-lg font-semibold">{movieCount} movie(s)</div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Created</div>
              <div className="text-sm">{formatDate(vj.createdAt)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Last Updated</div>
              <div className="text-sm">{formatDate(vj.updatedAt)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}