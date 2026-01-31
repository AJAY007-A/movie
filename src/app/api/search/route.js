import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const apiKey = process.env.OMDB_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    try {
        const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
    }
}