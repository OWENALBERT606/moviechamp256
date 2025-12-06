// import { getComingSoonMovies, getTrendingMovies, listMovies } from "@/actions/movies"
// import { ComingSoon } from "@/components/front-end/coming-soon"
// import { ContinueWatching } from "@/components/front-end/continue-watching"
// import { GenreFilter } from "@/components/front-end/genre-filter"
// import { HeroCarousel } from "@/components/front-end/hero-couresel"
// import { MovieSection } from "@/components/front-end/movie-section"
// import { Pricing } from "@/components/front-end/pricing"


// export default async function HomePage() {
//    const moviesData = await listMovies();
//     const movies = moviesData.data || [];

//      const [
//     trendingData,
//     comingSoonData,
//     allMoviesData,
//   ] = await Promise.all([
//     getTrendingMovies(10), // Get 10 trending movies
//     getComingSoonMovies(10), // Get 10 coming soon movies
//     listMovies({ limit: 50 }), // Get more movies for filtering
//   ]);


//    const trendingMovies = trendingData.data || [];
//   const comingSoonMovies = comingSoonData.data || [];
//   const allMovies = allMoviesData.data || [];




//    const actionMovies = allMovies.filter(
//     movie => movie.genre.name.toLowerCase().includes('action')
//   ).slice(0, 10);

//   const dramaMovies = allMovies.filter(
//     movie => movie.genre.name.toLowerCase().includes('drama')
//   ).slice(0, 10);

//   const thrillerMovies = allMovies.filter(
//     movie => movie.genre.name.toLowerCase().includes('thriller')
//   ).slice(0, 10);

// const newReleases = [...allMovies]
//     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//     .slice(0, 10);

//   return (
//     <div className="min-h-screen bg-background">
//       <HeroCarousel movies={movies} />
//       <main className="px-4 md:px-12 lg:px-24">
//         <div className="px-4 md:px-8 lg:px-12 space-y-12 pb-12">
//           <ContinueWatching />
//           <GenreFilter />
//           <MovieSection title="Trending Now" movies={trendingMovies} />
//           <MovieSection title="Action Movies" movies={actionMovies} />
//           <MovieSection title="Drama Series" movies={dramaMovies} />
//           <MovieSection title="New Releases" movies={newReleases} />
//           <ComingSoon movies={comingSoonMovies} />
//         </div>
//         <Pricing/>
//       </main>
//     </div>
//   )
// }




import { getComingSoonMovies, getTrendingMovies, listMovies } from "@/actions/movies"
import { ComingSoon } from "@/components/front-end/coming-soon"
import { ContinueWatching } from "@/components/front-end/continue-watching"
import { GenreFilter } from "@/components/front-end/genre-filter"
import { HeroCarousel } from "@/components/front-end/hero-couresel"
import { MovieSection } from "@/components/front-end/movie-section"
import { Pricing } from "@/components/front-end/pricing"

export default async function HomePage() {
  // Fetch all movie categories in parallel
  const [trendingData, comingSoonData, allMoviesData] = await Promise.all([
    getTrendingMovies(10), // Get 10 trending movies
    getComingSoonMovies(10), // Get 10 coming soon movies
    listMovies({ limit: 50 }), // Get more movies for filtering
  ])

  // Extract data
  const trendingMovies = trendingData.data || []
  const comingSoonMovies = comingSoonData.data || []
  const allMovies = allMoviesData.data || []

  // Get IDs of coming soon movies to exclude them
  const comingSoonIds = new Set(comingSoonMovies.map((movie) => movie.id))

  // Filter out coming soon movies from all movies
  const availableMovies = allMovies.filter((movie) => !comingSoonIds.has(movie.id))

  // Filter trending movies (exclude coming soon)
  const availableTrendingMovies = trendingMovies.filter(
    (movie) => !comingSoonIds.has(movie.id)
  )

  // Filter by genre (exclude coming soon)
  const actionMovies = availableMovies
    .filter((movie) => movie.genre.name.toLowerCase().includes("action"))
    .slice(0, 10)

  const dramaMovies = availableMovies
    .filter((movie) => movie.genre.name.toLowerCase().includes("drama"))
    .slice(0, 10)

  const thrillerMovies = availableMovies
    .filter((movie) => movie.genre.name.toLowerCase().includes("thriller"))
    .slice(0, 10)

  // Sort by newest (exclude coming soon)
  const newReleases = [...availableMovies]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  // Hero carousel movies (first 5 trending, exclude coming soon)
  const heroMovies = availableTrendingMovies.slice(0, 5)

  return (
    <div className="min-h-screen bg-background">
      <HeroCarousel movies={heroMovies} />
      <main className="px-4 md:px-12 lg:px-24">
        <div className="px-4 md:px-8 lg:px-12 space-y-12 pb-12">
          <ContinueWatching />
          <GenreFilter />
          <MovieSection title="🔥 Trending Now" movies={availableTrendingMovies} />
          <MovieSection title="💥 Action Movies" movies={actionMovies} />
          <MovieSection title="🎭 Drama Series" movies={dramaMovies} />
          <MovieSection title="😱 Thriller Movies" movies={thrillerMovies} />
          <MovieSection title="🆕 New Releases" movies={newReleases} />
          <ComingSoon movies={comingSoonMovies} />
        </div>
        <Pricing />
      </main>
    </div>
  )
}