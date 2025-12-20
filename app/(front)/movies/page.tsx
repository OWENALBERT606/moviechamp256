


import { listMovies } from "@/actions/movies";
import { listGenres } from "@/actions/genres";
import { listVJs } from "@/actions/vjs";
import { MovieFilters } from "./components/movies-filters";
import { MovieGrid } from "./components/movies-grid";
import { listReleaseYears } from "@/actions/releaseYear";
import { getSession } from "@/actions/auth";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{
    genre?: string;
    vj?: string;
    year?: string;
    search?: string;
    page?: string;
  }>;
}) {
   const session = await getSession();
      // if (!session) redirect("/login");
  const userId = session?.user?.id;
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");

  // Fetch movies with filters
  const moviesData = await listMovies({
    genreId: params.genre && params.genre !== "all" ? params.genre : undefined,
    vjId: params.vj && params.vj !== "all" ? params.vj : undefined,
    yearId: params.year && params.year !== "all" ? params.year : undefined,
    search: params.search || undefined,
    page: currentPage,
    limit: 20,
  });

  // Fetch filter options
  const [genresData, vjsData, yearsData] = await Promise.all([
    listGenres(),
    listVJs(),
    listReleaseYears(),
  ]);

  const movies = moviesData.data || [];
  const genres = genresData.data || [];
  const vjs = vjsData.data || [];
  const years = yearsData.data || [];
  const pagination = moviesData.pagination;

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 px-2 md:px-8 lg:px-12 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Movies</h1>
          <p className="text-muted-foreground">
            Discover our collection of {pagination?.total || movies.length} premium movies
          </p>
        </div>

        <MovieFilters 
          genres={genres}
          vjs={vjs}
          years={years}
          initialFilters={{
            genre: params.genre || "all",
            vj: params.vj || "all",
            year: params.year || "all",
            search: params.search || "",
          }}
        />
        
        <MovieGrid userId={userId} movies={movies} />
      </main>
    </div>
  );
}