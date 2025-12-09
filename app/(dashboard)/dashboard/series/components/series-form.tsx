"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createSeries, updateSeries, type Series } from "@/actions/series";
import { listVJs } from "@/actions/vjs";
import { listGenres } from "@/actions/genres";
import { Dropzone, FileWithMetadata } from "@/components/ui/dropzone";
import { listReleaseYears } from "@/actions/releaseYear";

interface SeriesFormProps {
  series?: Series;
}

export function SeriesForm({ series }: SeriesFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: series?.title || "",
    poster: series?.poster || "",
    trailerPoster: series?.trailerPoster || "",
    rating: series?.rating?.toString() || "0",
    vjId: series?.vjId || "",
    genreId: series?.genreId || "",
    yearId: series?.yearId || "",
    description: series?.description || "",
    director: series?.director || "",
    cast: series?.cast?.join(", ") || "",
    trailerUrl: series?.trailerUrl || "",
    isComingSoon: series?.isComingSoon || false,
    isTrending: series?.isTrending || false,
  });

  // Dropzone state
  const [posterFiles, setPosterFiles] = useState<FileWithMetadata[]>([]);
  const [trailerPosterFiles, setTrailerPosterFiles] = useState<FileWithMetadata[]>([]);
  const [trailerFiles, setTrailerFiles] = useState<FileWithMetadata[]>([]);

  // Options for selects
  const [vjs, setVjs] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [years, setYears] = useState<any[]>([]);

  const isEditing = !!series;

  // Load VJs, Genres, and Years
  useEffect(() => {
    async function loadOptions() {
      const [vjsData, genresData, yearsData] = await Promise.all([
        listVJs(),
        listGenres(),
        listReleaseYears(),
      ]);

      if (vjsData.success) setVjs(vjsData.data || []);
      if (genresData.success) setGenres(genresData.data || []);
      if (yearsData.success) setYears(yearsData.data || []);
    }
    loadOptions();
  }, []);

  // Update form data when files are uploaded
  useEffect(() => {
    if (posterFiles[0]?.publicUrl) {
      setFormData((prev) => ({ ...prev, poster: posterFiles[0].publicUrl! }));
    }
  }, [posterFiles]);

  useEffect(() => {
    if (trailerPosterFiles[0]?.publicUrl) {
      setFormData((prev) => ({ ...prev, trailerPoster: trailerPosterFiles[0].publicUrl! }));
    }
  }, [trailerPosterFiles]);

  useEffect(() => {
    if (trailerFiles[0]?.publicUrl) {
      setFormData((prev) => ({ ...prev, trailerUrl: trailerFiles[0].publicUrl! }));
    }
  }, [trailerFiles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Series title is required");
      return;
    }

    if (!formData.vjId || !formData.genreId || !formData.yearId) {
      toast.error("Please select VJ, Genre, and Year");
      return;
    }

    setIsLoading(true);

    try {
      const castArray = formData.cast
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        poster: formData.poster,
        trailerPoster: formData.trailerPoster,
        rating: parseFloat(formData.rating) || 0,
        vjId: formData.vjId,
        genreId: formData.genreId,
        yearId: formData.yearId,
        description: formData.description,
        director: formData.director,
        cast: castArray,
        trailerUrl: formData.trailerUrl,
        isComingSoon: formData.isComingSoon,
        isTrending: formData.isTrending,
      };

      let result;

      if (isEditing) {
        result = await updateSeries(series.id, payload);
      } else {
        result = await createSeries(payload);
      }

      if (result.success) {
        toast.success(
          isEditing ? "Series updated successfully!" : "Series created successfully!"
        );
        router.push("/dashboard/series");
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
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Series Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g., Breaking Bad"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      {/* Poster Upload */}
      <div className="space-y-2">
        <Label>Series Poster</Label>
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
          Series poster (max 5MB)
        </p>
      </div>

      {/* Trailer Poster Upload */}
      <div className="space-y-2">
        <Label>Trailer Poster</Label>
        <Dropzone
          provider="cloudflare-r2"
          variant="compact"
          maxFiles={1}
          maxSize={1024 * 1024 * 5}
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
          onFilesChange={setTrailerPosterFiles}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Trailer thumbnail (max 5MB)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* VJ Select */}
        <div className="space-y-2">
          <Label htmlFor="vjId">
            VJ <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.vjId}
            onValueChange={(value) => setFormData({ ...formData, vjId: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select VJ" />
            </SelectTrigger>
            <SelectContent>
              {vjs.map((vj) => (
                <SelectItem key={vj.id} value={vj.id}>
                  {vj.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Genre Select */}
        <div className="space-y-2">
          <Label htmlFor="genreId">
            Genre <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.genreId}
            onValueChange={(value) => setFormData({ ...formData, genreId: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre.id} value={genre.id}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Select */}
        <div className="space-y-2">
          <Label htmlFor="yearId">
            Year <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.yearId}
            onValueChange={(value) => setFormData({ ...formData, yearId: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.id} value={year.id}>
                  {year.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rating */}
        <div className="space-y-2">
          <Label htmlFor="rating">Rating (0-10)</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="e.g., 9.5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            disabled={isLoading}
          />
        </div>

        {/* Director */}
        <div className="space-y-2">
          <Label htmlFor="director">Director</Label>
          <Input
            id="director"
            type="text"
            placeholder="e.g., Vince Gilligan"
            value={formData.director}
            onChange={(e) => setFormData({ ...formData, director: e.target.value })}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Cast */}
      <div className="space-y-2">
        <Label htmlFor="cast">Cast (comma-separated)</Label>
        <Input
          id="cast"
          type="text"
          placeholder="e.g., Bryan Cranston, Aaron Paul, Anna Gunn"
          value={formData.cast}
          onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
          disabled={isLoading}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Series description..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={isLoading}
          rows={4}
        />
      </div>

      {/* Trailer Upload */}
      <div className="space-y-2">
        <Label>Trailer Video (Optional)</Label>
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
          Series trailer (max 100MB)
        </p>
      </div>

      {/* Checkboxes */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isTrending"
            checked={formData.isTrending}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isTrending: checked as boolean })
            }
            disabled={isLoading}
          />
          <Label htmlFor="isTrending" className="cursor-pointer">
            Mark as Trending
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isComingSoon"
            checked={formData.isComingSoon}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isComingSoon: checked as boolean })
            }
            disabled={isLoading}
          />
          <Label htmlFor="isComingSoon" className="cursor-pointer">
            Mark as Coming Soon
          </Label>
        </div>
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
            <>{isEditing ? "Update Series" : "Create Series"}</>
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