import Link from "next/link";
import { searchMovies } from "../lib/movieApi";
import SearchForm from "../components/SearchForm";

async function getMovies(query) {
  return await searchMovies(query);
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "Marvel";
  const movies = await getMovies(query);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white selection:bg-purple-500/30">
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-[#0f0f0f] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent z-0" />

        <div className="relative z-10 w-full max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            MovieVault
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Discover your next favorite film. Search through thousands of movies in seconds.
          </p>
          <SearchForm />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {params?.q ? (
              <>Results for: <span className="text-purple-400">{query}</span></>
            ) : (
              <span className="text-purple-400 text-3xl">Featured Movies</span>
            )}
          </h2>
          <p className="text-gray-500">{movies.length} matches found</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link
              href={`/movie/${movie.imdbID}`}
              key={movie.imdbID}
              className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)]"
            >
              <div className="aspect-[2/3] relative overflow-hidden">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"}
                  alt={movie.Title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-xs text-purple-400 font-bold uppercase tracking-wider">{movie.Type}</p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg leading-tight group-hover:text-purple-400 transition-colors line-clamp-2">
                  {movie.Title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{movie.Year}</span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] border border-white/10 italic">
                    {movie.imdbID}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>


        {query && movies.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-400 text-xl">No movies found named "{query}". Try another search!</p>
          </div>
        )}
      </div>
    </main>
  );
}