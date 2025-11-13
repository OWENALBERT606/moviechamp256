"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createReleaseYear, ReleaseYear, updateReleaseYear } from "@/actions/releaseYear";


interface ReleaseYearFormProps {
  year?: ReleaseYear;
}

export function ReleaseYearForm({ year }: ReleaseYearFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(year?.value?.toString() || "");

  const isEditing = !!year;
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const yearValue = parseInt(value);
    
    if (isNaN(yearValue)) {
      toast.error("Please enter a valid year");
      return;
    }

    if (yearValue < 1888 || yearValue > currentYear + 5) {
      toast.error(`Year must be between 1888 and ${currentYear + 5}`);
      return;
    }

    setIsLoading(true);

    try {
      let result;
      
      if (isEditing) {
        result = await updateReleaseYear(year.id, {
          value: yearValue,
        });
      } else {
        result = await createReleaseYear({
          value: yearValue,
        });
      }

      if (result.success) {
        toast.success(
          isEditing ? "Release year updated successfully!" : "Release year created successfully!"
        );
        router.push("/dashboard/release-years");
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
      {/* Year Field */}
      <div className="space-y-2">
        <Label htmlFor="value">
          Year <span className="text-destructive">*</span>
        </Label>
        <Input
          id="value"
          type="number"
          placeholder={`e.g., ${currentYear}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          disabled={isLoading}
          min={1888}
          max={currentYear + 5}
        />
        <p className="text-xs text-muted-foreground">
          Enter a year between 1888 and {currentYear + 5}
        </p>
      </div>

      {/* Year Info */}
      {value && !isNaN(parseInt(value)) && (
        <div className="bg-muted rounded-md p-4 space-y-2">
          <p className="text-sm font-medium">Year Information</p>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>• Year: {value}</div>
            <div>• Era: {parseInt(value) >= 2020 ? "Modern" : parseInt(value) >= 2000 ? "2000s" : parseInt(value) >= 1990 ? "90s" : "Classic"}</div>
            {parseInt(value) > currentYear && <div>• Status: Upcoming release</div>}
            {parseInt(value) === currentYear && <div>• Status: Current year</div>}
          </div>
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
            <>{isEditing ? "Update Year" : "Add Year"}</>
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