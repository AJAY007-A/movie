import { NextResponse } from "next/server";
import { getMovieDetails } from "../../../../lib/movieApi";

export async function GET(req, { params }) {
    const { id } = await params;
    const data = await getMovieDetails(id);
    return NextResponse.json(data);
}