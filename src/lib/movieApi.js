const API_KEY = "6b1217c4";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query) {
    if (!query) return { Search: [], Response: "False", Error: "No query" };
    try {
        const res = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("OMDB Search Error:", error);
        return { Search: [], Response: "False", Error: error.message };
    }
}

export async function getMovieDetails(id) {
    if (!id) return null;
    try {
        const res = await fetch(`${BASE_URL}?i=${encodeURIComponent(id)}&plot=full&apikey=${API_KEY}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("OMDB Detail Error:", error);
        return null;
    }
}
