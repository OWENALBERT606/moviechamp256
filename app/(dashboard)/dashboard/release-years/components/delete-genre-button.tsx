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
import { deleteGenre, type Genre } from "@/actions/genres";

interface DeleteGenreButtonProps {
  genre: Genre;
  variant?: "ghost" | "outline" | "destructive";
}

export function DeleteGenreButton({ genre, variant = "ghost" }: DeleteGenreButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const hasMovies = genre._count?.movies && genre._count.movies > 0;

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteGenre(genre.id);

      if (result.success) {
        toast.success("Genre deleted successfully!");
        router.push("/dashboard/genres");
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(result.error || "Failed to delete genre");
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
        //   disabled={hasMovies}
          title={hasMovies ? "Cannot delete genre with movies" : "Delete genre"}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Genre</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{genre.name}</strong>? This action cannot be undone.
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