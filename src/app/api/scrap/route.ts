import { getAllScrapList } from "@/app/api/scrap/apis";
import { NextResponse } from "next/server";

export async function GET() {
  const scrapList = await getAllScrapList();
  return NextResponse.json(scrapList);
}
