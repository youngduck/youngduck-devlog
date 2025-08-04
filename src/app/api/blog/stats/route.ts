import { getBlogStatsByMonth } from "../api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = getBlogStatsByMonth();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog statistics" },
      { status: 500 },
    );
  }
}