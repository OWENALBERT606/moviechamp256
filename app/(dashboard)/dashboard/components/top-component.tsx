"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  poster: string;
  viewsCount: number;
  rating: number;
}

interface TopContentProps {
  movies: ContentItem[];
  series: ContentItem[];
}

export function TopContent({ movies = [], series = [] }: TopContentProps) {
  const renderContent = (items: ContentItem[], type: "movies" | "series") => (
    <div className="space-y-3">
      {items.length > 0 ? (
        items.map((item, index) => (
          <Link
            key={item.id}
            href={`/${type}/${item.id}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 font-bold text-sm">
              {index + 1}
            </div>
            <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">{item.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {item.viewsCount.toLocaleString()}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.rating.toFixed(1)}
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-muted-foreground py-8">No content yet</p>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="movies">
          <TabsList className="w-full">
            <TabsTrigger value="movies" className="flex-1">
              Top Movies
            </TabsTrigger>
            <TabsTrigger value="series" className="flex-1">
              Top Series
            </TabsTrigger>
          </TabsList>
          <TabsContent value="movies" className="mt-4">
            {renderContent(movies, "movies")}
          </TabsContent>
          <TabsContent value="series" className="mt-4">
            {renderContent(series, "series")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}