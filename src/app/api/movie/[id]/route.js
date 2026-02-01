import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = await params;
    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    try {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${apiKey}`);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 });
    }
}