import { NextResponse, type NextRequest } from "next/server";

/**
 * 비공개 라우트 Basic Auth 게이트.
 * - 대상: matcher 에 적힌 경로 (일정관리 화면 + 그 화면의 Server Action POST)
 * - 계정: PRIVATE_BASIC_USER / PRIVATE_BASIC_PASS (env 미설정 시 전부 차단 — fail closed)
 */
export function middleware(req: NextRequest) {
  const user = process.env.PRIVATE_BASIC_USER;
  const pass = process.env.PRIVATE_BASIC_PASS;

  if (user && pass) {
    const header = req.headers.get("authorization") ?? "";
    const [scheme, encoded] = header.split(" ");
    if (scheme === "Basic" && encoded) {
      const [u, ...rest] = atob(encoded).split(":");
      if (u === user && rest.join(":") === pass) return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="youngduck-private"' },
  });
}

export const config = {
  matcher: ["/schedule/:path*"],
};
