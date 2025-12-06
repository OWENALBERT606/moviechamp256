

// import { getMovieBySlug, listMovies, incrementMovieViews } from "@/actions/movies";
// import { MovieInfo } from "@/components/front-end/movie-info";
// import { MoviePlayer } from "@/components/front-end/movie-player";
// import { RelatedMovies } from "@/components/front-end/related-movies";
// import { notFound } from "next/navigation";

// export default async function MovieDetailPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
  
//   // Fetch movie by slug
//   const movieData = await getMovieBySlug(slug);
//   const movie = movieData.data;

//   if (!movie) {
//     notFound();
//   }

//   // Increment view count (fire and forget)
//   incrementMovieViews(movie.id).catch(console.error);

//   // Fetch related movies (same genre)
//   const relatedMoviesData = await listMovies({
//     genreId: movie.genreId,
//     limit: 6,
//   });

//   const relatedMovies = (relatedMoviesData.data || []).filter(
//     (m) => m.id !== movie.id
//   );

//   return (
//     <div className="min-h-screen px-2 bg-background">
//       <main className="pt-20">
//         <MoviePlayer movie={movie} />
//         <div className="md:px-8 lg:px-12 py-12">
//           <MovieInfo movie={movie} />
//           <RelatedMovies movies={relatedMovies} />
//         </div>
//       </main>
//     </div>
//   );
// }


import { getMovieBySlug, listMovies, incrementMovieViews } from "@/actions/movies";

import { notFound } from "next/navigation";
import {MoviePlayerA } from "../components/movie-player";
import { MovieDetails } from "../components/movie-details";
import { MovieTrailer } from "../components/movie-trailer";
import { RelatedMovies } from "../components/related-movies";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Fetch movie by slug
  const movieData = await getMovieBySlug(slug);
  const movie = movieData.data;

  if (!movie) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementMovieViews(movie.id).catch(console.error);

  // Fetch related movies (same genre)
  const relatedMoviesData = await listMovies({
    genreId: movie.genreId,
    limit: 6,
  });

  const relatedMovies = (relatedMoviesData.data || []).filter(
    (m) => m.id !== movie.id
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Video Player Section */}
      <MoviePlayerA movie={movie} />

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 md:mt-32 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <MovieDetails movie={movie} />
            
            {/* Trailer Section */}
            {movie.trailerUrl && (
              <MovieTrailer movie={movie} />
            )}
          </div>

          {/* Right Column - Cast & Director */}
          <div className="space-y-6">
            {/* Director */}
            {movie.director && (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Director</h3>
                <p className="text-white font-medium">{movie.director}</p>
              </div>
            )}

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Cast</h3>
                <div className="space-y-2">
                  {movie.cast.map((actor, index) => (
                    <p key={index} className="text-white">{actor}</p>
                  ))}
                </div>
              </div>
            )}

            {/* VJ Info */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Translated By</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {movie.vj.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <p className="text-white font-medium">{movie.vj.name}</p>
                  {movie.vj.bio && (
                    <p className="text-sm text-gray-400">{movie.vj.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <div className="mt-16">
            <RelatedMovies movies={relatedMovies} />
          </div>
        )}
      </div>
    </div>
  );
}