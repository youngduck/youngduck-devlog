import { generateRSS } from "@/lib/api";

export const GET = async () => {
  const feedXml = generateRSS();

  if (feedXml) {
    return new Response(feedXml, {
      headers: { "Content-Type": "application/xml" },
    });
  } else {
    return new Response("Error generating RSS feed", { status: 500 });
  }
};
