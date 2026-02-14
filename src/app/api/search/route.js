import { NextResponse } from "next/server";
import { searchMovies } from "../../../lib/movieApi";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const data = await searchMovies(query);
    return NextResponse.json(data);
}