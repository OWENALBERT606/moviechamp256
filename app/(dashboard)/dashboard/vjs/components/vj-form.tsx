"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createVJ, updateVJ, type VJ } from "@/actions/vjs";

interface VJFormProps {
  vj?: VJ;
}

export function VJForm({ vj }: VJFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: vj?.name || "",
    bio: vj?.bio || "",
    avatarUrl: vj?.avatarUrl || "",
  });

  const isEditing = !!vj;

  const initials = formData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("VJ name is required");
      return;
    }

    setIsLoading(true);

    try {
      let result;
      
      if (isEditing) {
        result = await updateVJ(vj.id, {
          name: formData.name,
          bio: formData.bio || undefined,
          avatarUrl: formData.avatarUrl || undefined,
        });
      } else {
        result = await createVJ({
          name: formData.name,
          bio: formData.bio || undefined,
          avatarUrl: formData.avatarUrl || undefined,
        });
      }

      if (result.success) {
        toast.success(
          isEditing ? "VJ updated successfully!" : "VJ created successfully!"
        );
        router.push("/dashboard/vjs");
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
      {/* Avatar Preview */}
      {formData.name && (
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <Avatar className="h-16 w-16">
            <AvatarImage src={formData.avatarUrl} alt={formData.name} />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Preview</p>
            <p className="text-xs text-muted-foreground">
              This is how the VJ avatar will appear
            </p>
          </div>
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">
          VJ Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="e.g., VJ Emmy, VJ Junior"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          The display name for this VJ
        </p>
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Brief bio about this VJ..."
          value={formData.bio}
          onChange={(e) =>
            setFormData({ ...formData, bio: e.target.value })
          }
          disabled={isLoading}
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          Optional biography or description
        </p>
      </div>

      {/* Avatar URL Field */}
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">Avatar URL</Label>
        <Input
          id="avatarUrl"
          type="url"
          placeholder="https://example.com/avatar.jpg"
          value={formData.avatarUrl}
          onChange={(e) =>
            setFormData({ ...formData, avatarUrl: e.target.value })
          }
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Optional custom avatar image URL (leave empty for default)
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
            <>{isEditing ? "Update VJ" : "Create VJ"}</>
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