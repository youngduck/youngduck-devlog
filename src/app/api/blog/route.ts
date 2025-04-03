import { getAllPosts } from "@/app/api/blog/api";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}
