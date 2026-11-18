import "server-only";
import { monthRange, toKSTDate } from "./month";

/**
 * GitHub 커밋 → "자동 완료" 항목.
 * - 공개 저장소의 push 된 커밋만 잡힌다 (search API 특성).
 * - 머지 커밋 제외. 한 달 최대 100건(1페이지)만 가져온다.
 * - GITHUB_TOKEN 이 있으면 rate limit 이 넉넉해진다 (없어도 동작).
 */
export interface CommitItem {
  sha: string;
  url: string;
  repo: string; // owner/name
  project: string; // 저장소 이름 (필터 기준, Notion 프로젝트와 같은 이름 공간)
  message: string; // 첫 줄
  date: string; // YYYY-MM-DD (KST)
}

interface SearchCommitsResponse {
  items: {
    sha: string;
    html_url: string;
    repository: { full_name: string };
    commit: { message: string; author: { date: string } };
  }[];
}

export async function getMonthCommits(month: string): Promise<CommitItem[]> {
  const author = process.env.GITHUB_USERNAME ?? "youngduck";
  const { start, end } = monthRange(month);
  const q = `author:${author} author-date:${start}..${end} merge:false`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(
      `https://api.github.com/search/commits?q=${encodeURIComponent(q)}&sort=author-date&order=asc&per_page=100`,
      { headers, next: { revalidate: 600 } },
    );
    if (!res.ok) return [];
    const data: SearchCommitsResponse = await res.json();
    return data.items.map((c) => ({
      sha: c.sha,
      url: c.html_url,
      repo: c.repository.full_name,
      project: c.repository.full_name.split("/")[1],
      message: c.commit.message.split("\n")[0],
      date: toKSTDate(c.commit.author.date),
    }));
  } catch {
    // GitHub 실패해도 Notion 일정은 보여준다
    return [];
  }
}
