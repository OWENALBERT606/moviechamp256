

// // "use client";

// // import { useState, useEffect } from "react";
// // import Image from "next/image";
// // import { Play } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import type { Movie } from "@/actions/movies";
// // import { MoviePlayer } from "@/components/front-end/movie-player";
// // import { getWatchProgress } from "@/actions/watchHistory";

// // interface MoviePlayerSectionProps {
// //   movie: Movie;
// //   userId?: string; // Pass userId from parent
// // }

// // export function MoviePlayerA({ movie, userId }: MoviePlayerSectionProps) {
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [initialProgress, setInitialProgress] = useState(0);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // Fetch watch progress on mount
// //   useEffect(() => {
// //     async function fetchProgress() {
// //       if (!userId) {
// //         setIsLoading(false);
// //         return;
// //       }

// //       try {
// //         const result = await getWatchProgress(userId, movie.id, "movie");
// //         if (result.success && result.data) {
// //           setInitialProgress(result.data.progressPercent);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching watch progress:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }

// //     fetchProgress();
// //   }, [userId, movie.id]);

// //   if (isPlaying) {
// //     return (
// //       <div className="relative w-full mt-24">
// //         <MoviePlayer 
// //           movie={movie} 
// //           userId={userId}
// //           initialProgress={initialProgress}
// //         />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative w-full h-[70vh] overflow-hidden">
// //       {/* Background Image */}
// //       <div className="absolute inset-0">
// //         <Image
// //           src={movie.trailerPoster || movie.poster || movie.image}
// //           alt={movie.title}
// //           fill
// //           className="object-cover"
// //           priority
// //         />
// //         {/* Gradient Overlays */}
// //         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
// //         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
// //       </div>

// //       {/* Progress Bar (if user has watched before) */}
// //       {!isLoading && initialProgress > 0 && initialProgress < 90 && (
// //         <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
// //           <div
// //             className="h-full bg-orange-500 transition-all duration-300"
// //             style={{ width: `${initialProgress}%` }}
// //           />
// //         </div>
// //       )}

// //       {/* Play Button */}
// //       <div className="absolute inset-0 flex items-center justify-center">
// //         <div className="text-center">
// //           <Button
// //             size="lg"
// //             onClick={() => setIsPlaying(true)}
// //             disabled={isLoading}
// //             className="w-20 h-20 rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 hover:scale-110 disabled:opacity-50"
// //           >
// //             <Play className="w-10 h-10 fill-white text-white ml-1" />
// //           </Button>
          
// //           {/* Resume Indicator */}
// //           {!isLoading && initialProgress > 0 && initialProgress < 90 && (
// //             <p className="mt-4 text-white text-sm font-medium bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
// //               Resume from {Math.floor(initialProgress)}%
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import type { Movie } from "@/actions/movies";
// import { updateWatchProgress } from "@/actions/watchHistory";

// interface MoviePlayerProps {
//   movie: Movie;
//   userId?: string;
//   initialProgress?: number;
// }

// export function MoviePlayer({ movie, userId, initialProgress = 0 }: MoviePlayerProps) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState([70]);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [showControls, setShowControls] = useState(true);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const lastSaveTimeRef = useRef(0);

//   // Set initial position and save progress
//   const handleLoadedMetadata = () => {
//     if (videoRef.current) {
//       setDuration(videoRef.current.duration);
      
//       // Resume from last watched position if available
//       if (initialProgress > 0 && initialProgress < 90) {
//         const resumeTime = (initialProgress / 100) * videoRef.current.duration;
//         videoRef.current.currentTime = resumeTime;
//         setCurrentTime(resumeTime);
//       }
//     }
//   };

//   // Save progress periodically while playing
//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       const current = videoRef.current.currentTime;
//       setCurrentTime(current);

//       // Save progress every 10 seconds
//       if (userId && duration > 0) {
//         const now = Date.now();
//         if (now - lastSaveTimeRef.current >= 10000) {
//           lastSaveTimeRef.current = now;
//           updateWatchProgress(
//             userId,
//             movie.id,
//             "movie",
//             Math.floor(current),
//             Math.floor(duration)
//           ).catch(console.error);
//         }
//       }
//     }
//   };

//   // Save progress when pausing or ending
//   const saveProgress = () => {
//     if (userId && videoRef.current && duration > 0) {
//       updateWatchProgress(
//         userId,
//         movie.id,
//         "movie",
//         Math.floor(videoRef.current.currentTime),
//         Math.floor(duration)
//       ).catch(console.error);
//     }
//   };

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//         saveProgress();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleVolumeChange = (value: number[]) => {
//     setVolume(value);
//     if (videoRef.current) {
//       videoRef.current.volume = value[0] / 100;
//       if (value[0] === 0) {
//         setIsMuted(true);
//         videoRef.current.muted = true;
//       } else if (isMuted) {
//         setIsMuted(false);
//         videoRef.current.muted = false;
//       }
//     }
//   };

//   const handleSeek = (value: number[]) => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = value[0];
//       setCurrentTime(value[0]);
//     }
//   };

//   const handleFullscreen = () => {
//     if (videoRef.current) {
//       if (document.fullscreenElement) {
//         document.exitFullscreen();
//       } else {
//         videoRef.current.requestFullscreen();
//       }
//     }
//   };

//   const skip = (seconds: number) => {
//     if (videoRef.current) {
//       videoRef.current.currentTime += seconds;
//     }
//   };

//   const formatTime = (time: number) => {
//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const seconds = Math.floor(time % 60);

//     if (hours > 0) {
//       return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//     }
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const handleMouseMove = () => {
//     setShowControls(true);
//     if (controlsTimeoutRef.current) {
//       clearTimeout(controlsTimeoutRef.current);
//     }
//     controlsTimeoutRef.current = setTimeout(() => {
//       if (isPlaying) {
//         setShowControls(false);
//       }
//     }, 3000);
//   };

//   // Save on unmount
//   useEffect(() => {
//     return () => {
//       saveProgress();
//     };
//   }, []);

//   return (
//     <div
//       className="relative md:mt-24 bg-black aspect-video w-full max-h-[80vh]"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => isPlaying && setShowControls(false)}
//     >
//       <video
//         ref={videoRef}
//         className="w-full h-full"
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedMetadata={handleLoadedMetadata}
//         onPause={saveProgress}
//         onEnded={saveProgress}
//         onClick={togglePlay}
//         poster={movie.poster || movie.image}
//         preload="metadata"
//       >
//         <source src={movie.videoUrl} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Play Overlay */}
//       {!isPlaying && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//           <Button
//             size="lg"
//             onClick={togglePlay}
//             className="w-20 h-20 rounded-full bg-orange-500 hover:bg-orange-600"
//           >
//             <Play className="w-10 h-10 fill-white" />
//           </Button>
//         </div>
//       )}

//       {/* Controls */}
//       <div
//         className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 transition-opacity duration-300 ${
//           showControls ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         {/* Progress Bar */}
//         <div className="mb-4">
//           <Slider
//             value={[currentTime]}
//             max={duration || 100}
//             step={0.1}
//             onValueChange={handleSeek}
//             className="cursor-pointer"
//           />
//           <div className="flex items-center justify-between mt-2 text-xs text-white/70">
//             <span>{formatTime(currentTime)}</span>
//             <span>{formatTime(duration)}</span>
//           </div>
//         </div>

//         {/* Control Buttons */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={togglePlay}
//               className="text-white hover:bg-white/10"
//             >
//               {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => skip(-10)}
//               className="text-white hover:bg-white/10"
//             >
//               <SkipBack className="w-5 h-5" />
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => skip(10)}
//               className="text-white hover:bg-white/10"
//             >
//               <SkipForward className="w-5 h-5" />
//             </Button>

//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={toggleMute}
//                 className="text-white hover:bg-white/10"
//               >
//                 {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
//               </Button>
//               <div className="w-24 hidden md:block">
//                 <Slider
//                   value={volume}
//                   max={100}
//                   step={1}
//                   onValueChange={handleVolumeChange}
//                   className="cursor-pointer"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={handleFullscreen}
//               className="text-white hover:bg-white/10"
//             >
//               <Maximize className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { Movie } from "@/actions/movies";
import { updateWatchProgress } from "@/actions/watchHistory";

interface MoviePlayerProps {
  movie: Movie;
  userId?: string;
  initialProgress?: number;
}

export function MoviePlayer({ movie, userId, initialProgress = 0 }: MoviePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveTimeRef = useRef(0);

  // Set initial position and save progress
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      
      // Resume from last watched position if available
      if (initialProgress > 0 && initialProgress < 90) {
        const resumeTime = (initialProgress / 100) * videoRef.current.duration;
        videoRef.current.currentTime = resumeTime;
        setCurrentTime(resumeTime);
      }
    }
  };

  // Save progress periodically while playing
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);

      // Save progress every 10 seconds
      if (userId && duration > 0) {
        const now = Date.now();
        if (now - lastSaveTimeRef.current >= 10000) {
          lastSaveTimeRef.current = now;
          updateWatchProgress(
            userId,
            movie.id,
            "movie",
            Math.floor(current),
            Math.floor(duration)
          ).catch(console.error);
        }
      }
    }
  };

  // Save progress when pausing or ending
  const saveProgress = () => {
    if (userId && videoRef.current && duration > 0) {
      updateWatchProgress(
        userId,
        movie.id,
        "movie",
        Math.floor(videoRef.current.currentTime),
        Math.floor(duration)
      ).catch(console.error);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        saveProgress();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
      if (value[0] === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Save on unmount
  useEffect(() => {
    return () => {
      saveProgress();
    };
  }, []);

  return (
    <div
      className="relative w-full bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      style={{
        // Mobile: full viewport height minus header
        // Desktop: constrained height with aspect ratio
        height: typeof window !== 'undefined' && window.innerWidth < 768 
          ? 'calc(100vh - 64px)' 
          : 'auto',
        aspectRatio: typeof window !== 'undefined' && window.innerWidth >= 768 
          ? '16/9' 
          : 'auto',
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain md:object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPause={saveProgress}
        onEnded={saveProgress}
        onClick={togglePlay}
        poster={movie.poster || movie.image}
        preload="metadata"
      >
        <source src={movie.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button
            size="lg"
            onClick={togglePlay}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-500 hover:bg-orange-600"
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 fill-white ml-1" />
          </Button>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3 md:p-6 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-2 md:mb-4">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex items-center justify-between mt-1 md:mt-2 text-[10px] md:text-xs text-white/70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 md:w-6 md:h-6" />
              ) : (
                <Play className="w-4 h-4 md:w-6 md:h-6" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(-10)}
              className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10 hidden sm:flex"
            >
              <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(10)}
              className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10 hidden sm:flex"
            >
              <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </Button>
              <div className="w-16 md:w-24 hidden md:block">
                <Slider
                  value={volume}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreen}
              className="text-white hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
            >
              <Maximize className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}