"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteReleaseYear, ReleaseYear } from "@/actions/releaseYear";

interface DeleteReleaseYearButtonProps {
  year: ReleaseYear;
  variant?: "ghost" | "outline" | "destructive";
}

export function DeleteReleaseYearButton({ year, variant = "ghost" }: DeleteReleaseYearButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const hasMovies = year._count?.movies && year._count.movies > 0;

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteReleaseYear(year.id);

      if (result.success) {
        toast.success("Release year deleted successfully!");
        router.push("/dashboard/release-years");
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(result.error || "Failed to delete release year");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          // disabled={hasMovies}
          title={hasMovies ? "Cannot delete year with movies" : "Delete year"}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Release Year</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{year.value}</strong>? This action cannot be undone.
            {hasMovies && (
              <span className="block mt-2 text-destructive font-semibold">
                Warning: This year has {year._count?.movies} movie(s) associated with it.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}