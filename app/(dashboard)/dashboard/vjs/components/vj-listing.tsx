"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Pencil, Plus } from "lucide-react";
import type { VJ } from "@/actions/vjs";
import { DeleteVJButton } from "./delete-vj-button";

interface VJListingProps {
  vjs: VJ[];
}

export default function VJListing({ vjs }: VJListingProps) {
  const totalMovies = vjs.reduce((sum, vj) => sum + (vj._count?.movies || 0), 0);
  const emptyVJs = vjs.filter((vj) => !vj._count?.movies || vj._count.movies === 0).length;
  const activeVJs = vjs.filter((vj) => vj._count?.movies && vj._count.movies > 0).length;

  return (
    <>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total VJs</CardTitle>
            <span className="text-2xl">🎙️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vjs.length}</div>
            <p className="text-xs text-muted-foreground">All video jockeys</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <span className="text-2xl">🎬</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMovies}</div>
            <p className="text-xs text-muted-foreground">Across all VJs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active VJs</CardTitle>
            <span className="text-2xl">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeVJs}</div>
            <p className="text-xs text-muted-foreground">With movies</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All VJs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead className="text-center">Movies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vjs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl mb-2">🎙️</span>
                      <p className="text-muted-foreground">No VJs found</p>
                      <Link href="/dashboard/vjs/new">
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="mr-2 h-4 w-4" />
                          Create your first VJ
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                vjs.map((vj) => {
                  const movieCount = vj._count?.movies || 0;
                  const initials = vj.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <TableRow key={vj.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={vj.avatarUrl} alt={vj.name} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{vj.name}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {vj.bio || (
                          <span className="text-muted-foreground italic">No bio</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{movieCount}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={movieCount > 0 ? "default" : "secondary"}>
                          {movieCount > 0 ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(vj.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/dashboard/vjs/${vj.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/vjs/${vj.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteVJButton vj={vj} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}