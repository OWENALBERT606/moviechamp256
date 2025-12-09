"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createSeason, updateSeason, type Season } from "@/actions/series";
import { Dropzone, FileWithMetadata } from "@/components/ui/dropzone";

interface SeasonFormProps {
  seriesId: string;
  season?: Season;
}

export function SeasonForm({ seriesId, season }: SeasonFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    seasonNumber: season?.seasonNumber?.toString() || "",
    title: season?.title || "",
    description: season?.description || "",
    poster: season?.poster || "",
    trailerUrl: season?.trailerUrl || "",
    releaseYear: season?.releaseYear?.toString() || "",
  });

  // Dropzone state
  const [posterFiles, setPosterFiles] = useState<FileWithMetadata[]>([]);
  const [trailerFiles, setTrailerFiles] = useState<FileWithMetadata[]>([]);

  const isEditing = !!season;

  // Update form data when files are uploaded
  useEffect(() => {
    if (posterFiles[0]?.publicUrl) {
      setFormData((prev) => ({ ...prev, poster: posterFiles[0].publicUrl! }));
    }
  }, [posterFiles]);

  useEffect(() => {
    if (trailerFiles[0]?.publicUrl) {
      setFormData((prev) => ({ ...prev, trailerUrl: trailerFiles[0].publicUrl! }));
    }
  }, [trailerFiles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.seasonNumber) {
      toast.error("Season number is required");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        seasonNumber: parseInt(formData.seasonNumber),
        title: formData.title || undefined,
        description: formData.description || undefined,
        poster: formData.poster || undefined,
        trailerUrl: formData.trailerUrl || undefined,
        releaseYear: formData.releaseYear ? parseInt(formData.releaseYear) : undefined,
      };

      let result;

      if (isEditing) {
        result = await updateSeason(season.id, payload);
      } else {
        result = await createSeason(seriesId, payload);
      }

      if (result.success) {
        toast.success(
          isEditing ? "Season updated successfully!" : "Season created successfully!"
        );
        router.push(`/dashboard/series/${seriesId}`);
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
      {/* Season Number */}
      <div className="space-y-2">
        <Label htmlFor="seasonNumber">
          Season Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="seasonNumber"
          type="number"
          min="1"
          placeholder="e.g., 1"
          value={formData.seasonNumber}
          onChange={(e) => setFormData({ ...formData, seasonNumber: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Season Title (Optional)</Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g., The Beginning"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Leave empty to use "Season {formData.seasonNumber || "X"}"
        </p>
      </div>

      {/* Release Year */}
      <div className="space-y-2">
        <Label htmlFor="releaseYear">Release Year (Optional)</Label>
        <Input
          id="releaseYear"
          type="number"
          min="1900"
          max="2100"
          placeholder="e.g., 2024"
          value={formData.releaseYear}
          onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
          disabled={isLoading}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Season description..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={isLoading}
          rows={4}
        />
      </div>

      {/* Poster Upload */}
      <div className="space-y-2">
        <Label>Season Poster (Optional)</Label>
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
          Season-specific poster (max 5MB)
        </p>
      </div>

      {/* Trailer Upload */}
      <div className="space-y-2">
        <Label>Season Trailer (Optional)</Label>
        <Dropzone
          provider="cloudflare-r2"
          variant="compact"
          maxFiles={1}
          maxSize={1024 * 1024 * 100}
          accept={{ "video/*": [".mp4", ".mov", ".avi", ".mkv"] }}
          onFilesChange={setTrailerFiles}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Season trailer (max 100MB)
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
            <>{isEditing ? "Update Season" : "Create Season"}</>
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