import { getSession } from "@/actions/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Tv } from "lucide-react";
import { getWatchHistory } from "@/actions/watchHistory";
import { WatchHistoryList } from "./components/watch-history-list";

export default async function WatchHistoryPage() {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const [allResult, moviesResult, seriesResult] = await Promise.all([
    getWatchHistory(userId),
    getWatchHistory(userId, "movies"),
    getWatchHistory(userId, "series"),
  ]);

  const allHistory = allResult.data || [];
  const moviesHistory = moviesResult.data || [];
  const seriesHistory = seriesResult.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Watch History</h1>
          <p className="text-muted-foreground">
            Track everything you've watched
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All ({allHistory.length})
          </TabsTrigger>
          <TabsTrigger value="movies">
            <Film className="w-4 h-4 mr-2" />
            Movies ({moviesHistory.length})
          </TabsTrigger>
          <TabsTrigger value="series">
            <Tv className="w-4 h-4 mr-2" />
            Series ({seriesHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <WatchHistoryList items={allHistory} userId={userId} />
        </TabsContent>

        <TabsContent value="movies">
          <WatchHistoryList items={moviesHistory} userId={userId} />
        </TabsContent>

        <TabsContent value="series">
          <WatchHistoryList items={seriesHistory} userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}