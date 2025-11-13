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
import { Eye, Pencil, Plus } from "lucide-react";
import type { Genre } from "@/actions/genres";
import { DeleteGenreButton } from "./delete-genre-button";

interface GenreListingProps {
  genres: Genre[];
}

export default function GenreListing({ genres }: GenreListingProps) {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Genres</CardTitle>
            <span className="text-2xl">🎭</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{genres.length}</div>
            <p className="text-xs text-muted-foreground">All movie categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <span className="text-2xl">🎬</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {genres.reduce((sum, g) => sum + (g._count?.movies || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all genres</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empty Genres</CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {genres.filter((g) => !g._count?.movies || g._count.movies === 0).length}
            </div>
            <p className="text-xs text-muted-foreground">No movies assigned</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Genres</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Movies</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {genres.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl mb-2">🎭</span>
                      <p className="text-muted-foreground">No genres found</p>
                      <Link href="/dashboard/genres/new">
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="mr-2 h-4 w-4" />
                          Create your first genre
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                genres.map((genre) => (
                  <TableRow key={genre.id}>
                    <TableCell className="font-medium">{genre.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {genre.slug}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {genre.description || (
                        <span className="text-muted-foreground italic">No description</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{genre._count?.movies || 0}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(genre.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/genres/${genre.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/genres/${genre.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteGenreButton genre={genre} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}