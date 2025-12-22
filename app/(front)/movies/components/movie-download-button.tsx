"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MovieDownloadButtonProps {
  movieId: string;
  movieTitle: string;
  downloadUrl?: string | null;
}

export function MovieDownloadButton({
  movieId,
  movieTitle,
  downloadUrl,
}: MovieDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!downloadUrl) {
      toast.error("Download not available for this movie");
      return;
    }

    try {
      setIsDownloading(true);
      
      // Track download analytics
      await fetch("/api/movies/track-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId }),
      });

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${movieTitle.replace(/[^a-z0-9]/gi, "_")}.mp4`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to start download");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!downloadUrl) {
    return null;
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant="outline"
      className="bg-gray-900/80 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white gap-2"
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Preparing...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download Movie
        </>
      )}
    </Button>
  );
}