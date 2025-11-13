"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createGenre, updateGenre, type Genre } from "@/actions/genres";

interface GenreFormProps {
  genre?: Genre;
}

export function GenreForm({ genre }: GenreFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: genre?.name || "",
    description: genre?.description || "",
  });

  const isEditing = !!genre;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Genre name is required");
      return;
    }

    setIsLoading(true);

    try {
      let result;
      
      if (isEditing) {
        result = await updateGenre(genre.id, {
          name: formData.name,
          description: formData.description || undefined,
        });
      } else {
        result = await createGenre({
          name: formData.name,
          description: formData.description || undefined,
        });
      }

      if (result.success) {
        toast.success(
          isEditing ? "Genre updated successfully!" : "Genre created successfully!"
        );
        router.push("/dashboard/genres");
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
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Genre Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="e.g., Action, Comedy, Drama"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          The display name for this genre
        </p>
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Brief description of this genre..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          disabled={isLoading}
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          Optional description to help users understand this genre
        </p>
      </div>

      {/* Preview Slug */}
      {formData.name && (
        <div className="space-y-2">
          <Label>URL Slug Preview</Label>
          <div className="bg-muted rounded-md px-3 py-2 text-sm font-mono">
            {formData.name
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "")}
          </div>
          <p className="text-xs text-muted-foreground">
            Auto-generated URL-friendly slug
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update Genre" : "Create Genre"}</>
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