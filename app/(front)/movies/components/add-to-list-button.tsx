
// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Plus, Check, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { addToMyList, removeFromMyList, checkInMyList } from "@/actions/mylist";
// import { useRouter } from "next/navigation";

// interface AddToListButtonProps {
//   itemId: string;
//   type: "movie" | "series";
//   variant?: "default" | "outline" | "ghost" | "secondary";
//   size?: "default" | "sm" | "lg" | "icon";
//   showText?: boolean;
//   className?: string;
// }

// export function AddToListButton({
//   itemId,
//   type,
//   variant = "outline",
//   size = "default",
//   showText = true,
//   className = "",
// }: AddToListButtonProps) {
//   const router = useRouter();
//   const [inList, setInList] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);
//   const [currentUserId, setCurrentUserId] = useState<string | null>(null);

//   // Get user session on mount
//   useEffect(() => {
//     async function checkAuth() {
//       try {
//         // Fetch session from your auth endpoint
//         const response = await fetch("/api/auth/session");
//         const session = await response.json();
        
//         if (session?.user?.id) {
//           setCurrentUserId(session.user.id);
//         } else {
//           // ✅ No user session, stop checking immediately
//           setIsChecking(false);
//         }
//       } catch (error) {
//         console.error("Error fetching session:", error);
//         // ✅ Error fetching session, stop checking
//         setIsChecking(false);
//       }
//     }

//     checkAuth();
//   }, []);

//   // Check if item is in list
//   useEffect(() => {
//     async function checkList() {
//       if (!currentUserId) {
//         return;
//       }

//       try {
//         const result = await checkInMyList(currentUserId, itemId, type);
//         setInList(result.inList);
//       } catch (error) {
//         console.error("Error checking list:", error);
//       } finally {
//         // ✅ Always stop checking, even if there's an error
//         setIsChecking(false);
//       }
//     }

//     if (currentUserId) {
//       checkList();
//     }
//   }, [currentUserId, itemId, type]);

//   const handleToggle = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!currentUserId) {
//       toast.error("Please login to add to your list", {
//         description: "Sign in to save your favorite movies and series",
//       });
//       router.push("/login?redirect=/my-list&message=login-required");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       if (inList) {
//         const result = await removeFromMyList(currentUserId, itemId, type);
//         if (result.success) {
//           setInList(false);
//           toast.success("Removed from your list");
//         } else {
//           toast.error(result.error || "Failed to remove from list");
//         }
//       } else {
//         const result = await addToMyList(currentUserId, itemId, type);
//         if (result.success) {
//           setInList(true);
//           toast.success("Added to your list", {
//             action: {
//               label: "View List",
//               onClick: () => router.push("/my-list"),
//             },
//           });
//         } else {
//           toast.error(result.error || "Failed to add to list");
//         }
//       }
//     } catch (error) {
//       console.error("Error toggling list:", error);
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ✅ Show Plus icon while checking (no spinner)
//   if (isChecking) {
//     return (
//       <Button 
//         variant={variant} 
//         size={size} 
//         disabled 
//         className={className}
//         onClick={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//         }}
//       >
//         <Plus className="w-4 h-4 opacity-50" />
//         {showText && <span className="ml-2 opacity-50">My List</span>}
//       </Button>
//     );
//   }

//   return (
//     <Button
//       variant={variant}
//       size={size}
//       onClick={handleToggle}
//       disabled={isLoading}
//       className={className}
//       title={inList ? "Remove from My List" : "Add to My List"}
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="w-4 h-4 animate-spin" />
//           {showText && <span className="ml-2">...</span>}
//         </>
//       ) : inList ? (
//         <>
//           <Check className="w-4 h-4" />
//           {showText && <span className="ml-2">In My List</span>}
//         </>
//       ) : (
//         <>
//           <Plus className="w-4 h-4" />
//           {showText && <span className="ml-2">My List</span>}
//         </>
//       )}
//     </Button>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { addToMyList, removeFromMyList, checkInMyList } from "@/actions/mylist";
import { useRouter } from "next/navigation";

interface AddToListButtonProps {
  itemId: string;
  type: "movie" | "series";
  userId?: string; // ✅ Accept userId as prop
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
  className?: string;
}

export function AddToListButton({
  itemId,
  type,
  userId,
  variant = "outline",
  size = "default",
  showText = true,
  className = "",
}: AddToListButtonProps) {
  const router = useRouter();
  const [inList, setInList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(!!userId); // ✅ Only check if userId exists

  // Check if item is in list when userId is available
  useEffect(() => {
    async function checkList() {
      if (!userId) {
        setIsChecking(false);
        return;
      }

      try {
        const result = await checkInMyList(userId, itemId, type);
        setInList(result.inList);
      } catch (error) {
        console.error("Error checking list:", error);
      } finally {
        setIsChecking(false);
      }
    }

    checkList();
  }, [userId, itemId, type]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("Please login to add to your list", {
        description: "Sign in to save your favorite movies and series",
      });
      router.push("/login?redirect=/list&message=login-required");
      return;
    }

    setIsLoading(true);

    try {
      if (inList) {
        const result = await removeFromMyList(userId, itemId, type);
        if (result.success) {
          setInList(false);
          toast.success("Removed from your list");
        } else {
          toast.error(result.error || "Failed to remove from list");
        }
      } else {
        const result = await addToMyList(userId, itemId, type);
        if (result.success) {
          setInList(true);
          toast.success("Added to your list", {
            action: {
              label: "View List",
              onClick: () => router.push("/list"),
            },
          });
        } else {
          toast.error(result.error || "Failed to add to list");
        }
      }
    } catch (error) {
      console.error("Error toggling list:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Show Plus icon while checking (no spinner)
  if (isChecking) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        disabled 
        className={className}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Plus className="w-4 h-4 opacity-50" />
        {showText && <span className="ml-2 opacity-50">My List</span>}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      disabled={isLoading}
      className={className}
      title={inList ? "Remove from My List" : "Add to My List"}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {showText && <span className="ml-2">...</span>}
        </>
      ) : inList ? (
        <>
          <Check className="w-4 h-4" />
          {showText && <span className="ml-2">In My List</span>}
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" />
          {showText && <span className="ml-2">My List</span>}
        </>
      )}
    </Button>
  );
}