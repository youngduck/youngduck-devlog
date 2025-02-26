import { getAllScrapList } from "@/app/home/apis/scrap-apis";
import { NextResponse } from "next/server";

export async function GET() {
  const scrapList = await getAllScrapList();
  return NextResponse.json(scrapList);
}
