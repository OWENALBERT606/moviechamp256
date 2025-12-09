"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createEpisode, updateEpisode, type Episode } from "@/actions/series";
import { Dropzone, FileWithMetadata } from "@/components/ui/dropzone";

interface EpisodeFormProps {
  seriesId: string;
  seasonId: string;
  episode?: Episode;
}

export function EpisodeForm({ seriesId, seasonId, episode }: EpisodeFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    episodeNumber: episode?.episodeNumber?.toString() || "",
    title: episode?.title || "",
    description: episode?.description || "",
    videoUrl: episode?.videoUrl || "",
    poster: episode?.poster || "",
    length: episode?.length || "",
    lengthSeconds: episode?.lengthSeconds?.toString() || "",
    size: episode?.size || "",
    releaseDate: episode?.releaseDate 
      ? new Date(episode.releaseDate).toISOString().split('T')[0] 
      : "",
  });

  // Dropzone state
  const [posterFiles, setPosterFiles] = useState<FileWithMetadata[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileWithMetadata[]>([]);

  const isEditing = !!episode;

  // Update form data when files are uploaded
  useEffect(() => {
    if (posterFiles[0]?.publicUrl) {
      setFormData((prev) => ({ ...prev, poster: posterFiles[0].publicUrl! }));
    }
  }, [posterFiles]);

  useEffect(() => {
    if (videoFiles[0]?.publicUrl) {
      setFormData((prev) => ({ ...prev, videoUrl: videoFiles[0].publicUrl! }));
    }
  }, [videoFiles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.episodeNumber || !formData.title || !formData.videoUrl) {
      toast.error("Episode number, title, and video URL are required");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        episodeNumber: parseInt(formData.episodeNumber),
        title: formData.title,
        description: formData.description || undefined,
        videoUrl: formData.videoUrl,
        poster: formData.poster || undefined,
        length: formData.length || undefined,
        lengthSeconds: formData.lengthSeconds ? parseInt(formData.lengthSeconds) : undefined,
        size: formData.size || undefined,
        releaseDate: formData.releaseDate || undefined,
      };

      let result;

      if (isEditing) {
        result = await updateEpisode(episode.id, payload);
      } else {
        result = await createEpisode(seasonId, payload);
      }

      if (result.success) {
        toast.success(
          isEditing ? "Episode updated successfully!" : "Episode created successfully!"
        );
        router.push(`/dashboard/series/${seriesId}/seasons/${seasonId}`);
        router.refresh();
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Form error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Episode Number */}
        <div className="space-y-2">
          <Label htmlFor="episodeNumber">
            Episode Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="episodeNumber"
            type="number"
            min="1"
            placeholder="e.g., 1"
            value={formData.episodeNumber}
            onChange={(e) => setFormData({ ...formData, episodeNumber: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>

        {/* Release Date */}
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Episode Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g., Pilot"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Episode description..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={isLoading}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Length */}
        <div className="space-y-2">
          <Label htmlFor="length">Duration</Label>
          <Input
            id="length"
            type="text"
            placeholder="e.g., 58m"
            value={formData.length}
            onChange={(e) => setFormData({ ...formData, length: e.target.value })}
            disabled={isLoading}
          />
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label htmlFor="size">File Size</Label>
          <Input
            id="size"
            type="text"
            placeholder="e.g., 1.2 GB"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Poster Upload */}
      <div className="space-y-2">
        <Label>Episode Thumbnail</Label>
        <Dropzone
          provider="cloudflare-r2"
          variant="compact"
          maxFiles={1}
          maxSize={1024 * 1024 * 5}
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
          onFilesChange={setPosterFiles}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Episode thumbnail image (max 5MB)
        </p>
      </div>

      {/* Video Upload */}
      <div className="space-y-2">
        <Label>
          Episode Video <span className="text-destructive">*</span>
        </Label>
        <Dropzone
          provider="cloudflare-r2"
          variant="compact"
          maxFiles={1}
          maxSize={1024 * 1024 * 1024 * 5}
          accept={{ "video/*": [".mp4", ".mov", ".avi", ".mkv"] }}
          onFilesChange={setVideoFiles}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Full episode video (max 5GB)
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update Episode" : "Create Episode"}</>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}