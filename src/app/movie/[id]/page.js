import Link from "next/link";

async function getMovieDetails(id) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/movie/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Detail fetch error:", error);
        return null;
    }
}

export default async function MovieDetail({ params }) {
    const { id } = await params;
    const movie = await getMovieDetails(id);

    if (!movie || movie.Response === "False") {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-4 text-red-500">Movie Not Found</h1>
                <Link href="/" className="text-purple-400 hover:underline">
                    Go back to home
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f0f0f] text-white pb-20">

            <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/1920x1080?text=No+Backdrop"}
                    alt={movie.Title}
                    className="w-full h-full object-cover opacity-30 blur-xl scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent" />
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-60 relative z-10">
                <div className="flex flex-col md:flex-row gap-10">
    
                    <div className="w-full md:w-80 flex-shrink-0">
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/20">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"}
                                alt={movie.Title}
                                className="w-full h-auto"
                            />
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-yellow-500 text-black px-2 py-1 rounded-md font-bold text-sm">IMDb</span>
                                <span className="text-xl font-bold">{movie.imdbRating}</span>
                                <span className="text-gray-400 text-sm">/10</span>
                            </div>
                            <div className="text-sm text-gray-400">
                                {movie.imdbVotes} votes
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Search
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                                {movie.Title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                                <span className="bg-purple-600/30 border border-purple-500/50 px-3 py-1 rounded-full">{movie.Year}</span>
                                <span className="bg-blue-600/30 border border-blue-500/50 px-3 py-1 rounded-full">{movie.Rated}</span>
                                <span className="bg-emerald-600/30 border border-emerald-500/50 px-3 py-1 rounded-full">{movie.Runtime}</span>
                                <span className="text-gray-500">•</span>
                                <span>{movie.Genre}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-purple-400">Plot Summary</h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {movie.Plot}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                            <div className="space-y-2">
                                <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs">Director</h3>
                                <p className="text-white text-lg">{movie.Director}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs">Cast</h3>
                                <p className="text-white text-lg">{movie.Actors}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs">Writer</h3>
                                <p className="text-white text-lg">{movie.Writer}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs">Awards</h3>
                                <p className="text-white text-lg">{movie.Awards}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs">Country/Language</h3>
                                <p className="text-white text-lg">{movie.Country} • {movie.Language}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs">Box Office</h3>
                                <p className="text-white text-lg">{movie.BoxOffice || "N/A"}</p>
                            </div>
                        </div>

                        {movie.Ratings && movie.Ratings.length > 0 && (
                            <div className="pt-8 space-y-4">
                                <h3 className="text-2xl font-bold text-purple-400">Other Ratings</h3>
                                <div className="flex flex-wrap gap-4">
                                    {movie.Ratings.map((rating, index) => (
                                        <div key={index} className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-center flex-1 min-w-[150px]">
                                            <p className="text-xs text-gray-500 mb-1">{rating.Source}</p>
                                            <p className="text-xl font-bold text-purple-300">{rating.Value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}