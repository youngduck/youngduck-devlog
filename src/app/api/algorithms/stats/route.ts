import { getAlgorithmStatsByMonth } from "../api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = getAlgorithmStatsByMonth();
    return NextResponse.json(stats);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching algorithm stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch algorithm statistics" },
      { status: 500 },
    );
  }
}
