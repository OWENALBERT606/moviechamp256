// app/page.tsx
// Movie streaming homepage for Next.js 15 + Tailwind v3
// - Uses only Tailwind classes (no shadcn dependency required)
// - Replace dummy data with your DB/API later
// - Includes lightweight DEV tests to catch data shape mistakes

import Link from "next/link";

// ---------------------------
// Types & dummy data
// ---------------------------
type Movie = {
  id: string;
  title: string;
  year: number;
  poster: string;
  rating: number; // 0..10
  genres: string[];
};

// Dummy movie data — replace with your DB/API
// NOTE: keep commas between objects and avoid stray characters (#, etc.)
const MOVIES: ReadonlyArray<Movie> = Object.freeze([
  {
    id: "dune-2",
    title: "Dune: Part Two",
    year: 2024,
    poster: "https://picsum.photos/seed/dune2/600/900",
    rating: 8.7,
    genres: ["Sci-Fi", "Adventure"],
  }, // <- comma separating objects is required
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    year: 2023,
    poster: "https://picsum.photos/seed/oppen/600/900",
    rating: 8.6,
    genres: ["Drama", "History"],
  },
  {
    id: "inside-out-2",
    title: "Inside Out 2",
    year: 2024,
    poster: "https://picsum.photos/seed/insideout2/600/900",
    rating: 7.9,
    genres: ["Animation", "Family"],
  },
  {
    id: "furiosa",
    title: "Furiosa: A Mad Max Saga",
    year: 2024,
    poster: "https://picsum.photos/seed/furiosa/600/900",
    rating: 7.5,
    genres: ["Action", "Adventure"],
  },
  {
    id: "damsel",
    title: "Damsel",
    year: 2024,
    poster: "https://picsum.photos/seed/damsel/600/900",
    rating: 6.8,
    genres: ["Fantasy", "Action"],
  },
  {
    id: "the-batman",
    title: "The Batman",
    year: 2022,
    poster: "https://picsum.photos/seed/batman/600/900",
    rating: 7.9,
    genres: ["Action", "Crime"],
  },
]);

const CATEGORIES = [
  "Trending",
  "New",
  "Top Rated",
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Animation",
  "Horror",
] as const;

// ---------------------------
// Lightweight DEV tests (run on server during dev)
// ---------------------------
function validateMovies(movies: ReadonlyArray<Movie>) {
  const errors: string[] = [];
  const ids = new Set<string>();

  movies.forEach((m, idx) => {
    if (!m) errors.push(`Movie at index ${idx} is null/undefined`);
    if (typeof m.id !== "string" || m.id.trim() === "") errors.push(`${m?.title ?? idx}: invalid id`);
    if (ids.has(m.id)) errors.push(`${m.title}: duplicate id '${m.id}'`);
    ids.add(m.id);

    if (typeof m.title !== "string" || m.title.trim() === "") errors.push(`${m.id}: invalid title`);
    if (typeof m.year !== "number") errors.push(`${m.id}: year must be a number`);
    if (typeof m.rating !== "number" || m.rating < 0 || m.rating > 10) errors.push(`${m.id}: rating out of range 0..10`);
    if (!Array.isArray(m.genres) || m.genres.length === 0) errors.push(`${m.id}: genres must be non-empty array`);

    // Guard against stray '#' or other accidental characters in data that can break parsing in some editors
    if (/[#]/.test(m.id) || /[#]/.test(m.title)) errors.push(`${m.id}: stray '#' detected in id/title`);
  });

  if (errors.length) {
    // Surface loudly in dev so issues are fixed early
    throw new Error(`Movie data validation failed:\n- ${errors.join("\n- ")}`);
  }
}

if (process.env.NODE_ENV !== "production") {
  validateMovies(MOVIES);
}

// ---------------------------
// Page
// ---------------------------
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <NavBar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* soft radial background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-10%,hsl(240_5%_90%_/_0.6),transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-10%,hsl(240_10%_10%_/_0.6),transparent)]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-10 md:grid-cols-2 md:items-center md:py-16">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              🍿 New this week: 20+ releases
            </span>
            <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Stream movies in crisp quality.
              <br /> Discover your next favorite.
            </h1>
            <p className="max-w-prose text-muted-foreground">
              Watch instantly with adaptive streaming. Download to watch offline. No ads on premium.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#trending"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
              >
                Browse Trending
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Get Premium
              </Link>
            </div>

            {/* Search */}
            <form action="/search" className="mt-4 flex items-center gap-2">
              <input
                name="q"
                placeholder="Search movies, genres, people…"
                className="w-full flex-1 rounded-xl border border-border bg-background/60 px-4 py-3 outline-none ring-0 placeholder:text-muted-foreground focus:border-ring"
              />
              <button className="rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background hover:opacity-90">
                Search
              </button>
            </form>

            {/* Categories */}
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  href={`/category/${encodeURIComponent(c.toLowerCase())}`}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Hero art / poster collage */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {MOVIES.slice(0, 6).map((m) => (
              <div key={m.id} className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-card">
                {/* Using <img> to avoid Next/Image remote config in starter */}
                <img
                  src={m.poster}
                  alt={m.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <Section id="trending" title="Trending Now" subtitle="What everyone is watching today">
        <MovieGrid movies={MOVIES} />
      </Section>

      <Section id="new" title="New Releases" subtitle="Fresh arrivals you shouldn’t miss">
        <MovieGrid movies={[...MOVIES].reverse()} />
      </Section>

      <Section id="top" title="Top Rated" subtitle="Critically acclaimed and fan favorites">
        <MovieGrid movies={MOVIES} />
      </Section>

      <SiteFooter />
    </main>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Maripa Movies
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="#trending" className="text-sm text-muted-foreground hover:text-foreground">
            Trending
          </Link>
          <Link href="#new" className="text-sm text-muted-foreground hover:text-foreground">
            New
          </Link>
          <Link href="#top" className="text-sm text-muted-foreground hover:text-foreground">
            Top Rated
          </Link>
          <Link href="/genres" className="text-sm text-muted-foreground hover:text-foreground">
            Genres
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/auth/sign-in" className="hidden rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground md:inline-flex">
            Sign in
          </Link>
          <Link href="/pricing" className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            Get Premium
          </Link>
        </div>
      </div>
    </header>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <Link href={`/section/${id ?? title.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground">
          View all →
        </Link>
      </div>
      {children}
    </section>
  );
}

function MovieGrid({ movies }: { movies: ReadonlyArray<Movie> }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}

function MovieCard({
  movie,
}: {
  movie: Movie;
}) {
  return (
    <Link href={`/movies/${movie.id}`} className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border bg-card">
        <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="pointer-events-none absolute left-2 top-2 rounded-md bg-black/70 px-1.5 py-1 text-xs text-white">
          ⭐ {movie.rating}
        </div>
      </div>
      <div className="mt-2 space-y-0.5">
        <div className="truncate text-sm font-medium">{movie.title}</div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{movie.year}</span>
          <span>•</span>
          <span className="truncate">{movie.genres.slice(0, 2).join(" · ")}</span>
        </div>
      </div>
    </Link>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-2">
        <div>
          <div className="text-lg font-semibold">Maripa Movies</div>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            Stream and download high‑quality movies. Built with Next.js & Tailwind.
          </p>
        </div>
        <div className="flex items-center justify-start gap-6 md:justify-end">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
          <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground">Legal</Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
