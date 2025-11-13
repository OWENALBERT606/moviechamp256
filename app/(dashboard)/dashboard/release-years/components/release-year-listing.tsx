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
import { ReleaseYear } from "@/actions/releaseYear";
import { DeleteReleaseYearButton } from "./delete-release-year-button";


interface ReleaseYearListingProps {
  years: ReleaseYear[];
}

export default function ReleaseYearListing({ years }: ReleaseYearListingProps) {
  const currentYear = new Date().getFullYear();
  const recentYears = years.filter(y => y.value >= currentYear - 5);
  const totalMovies = years.reduce((sum, y) => sum + (y._count?.movies || 0), 0);
  const emptyYears = years.filter((y) => !y._count?.movies || y._count.movies === 0).length;

  return (
    <>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Years</CardTitle>
            <span className="text-2xl">📅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{years.length}</div>
            <p className="text-xs text-muted-foreground">All release years</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <span className="text-2xl">🎬</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMovies}</div>
            <p className="text-xs text-muted-foreground">Across all years</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Years</CardTitle>
            <span className="text-2xl">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentYears.length}</div>
            <p className="text-xs text-muted-foreground">Last 5 years</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Release Years</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead className="text-center">Movies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {years.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl mb-2">📅</span>
                      <p className="text-muted-foreground">No release years found</p>
                      <Link href="/dashboard/release-years/new">
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="mr-2 h-4 w-4" />
                          Create your first year
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                years.map((year) => {
                  const movieCount = year._count?.movies || 0;
                  const isRecent = year.value >= currentYear - 5;
                  
                  return (
                    <TableRow key={year.id}>
                      <TableCell className="font-bold text-lg">
                        {year.value}
                        {isRecent && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Recent
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{movieCount}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={movieCount > 0 ? "default" : "secondary"}>
                          {movieCount > 0 ? "Active" : "Empty"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(year.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/dashboard/release-years/${year.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/release-years/${year.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteReleaseYearButton year={year} />
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