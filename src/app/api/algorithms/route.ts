import { getAllAlgorithms } from "@/app/api/algorithms/api";
import { NextResponse } from "next/server";

export async function GET() {
  const algorithms = await getAllAlgorithms();
  return NextResponse.json(algorithms);
}
