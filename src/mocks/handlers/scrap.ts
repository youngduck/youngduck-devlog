import { http, HttpResponse } from "msw";

export const scrapHandlers = [
  // 게시물 관련 핸들러
  http.get("http://localhost:3000/api/scrap", () => {
    return HttpResponse.json([
      {
        id: "1",
        name: "모킹된 스크랩 항목 1",
        link: "https://example.com/scrap1",
        tags: ["React", "Next.js"],
      },
      {
        id: "2",
        name: "모킹된 스크랩 항목 2",
        link: "https://example.com/scrap2",
        tags: ["TypeScript", "MSW"],
      },
      {
        id: "3",
        name: "모킹된 스크랩 항목 3",
        link: "https://example.com/scrap3",
        tags: ["Storybook", "Testing"],
      },
      {
        id: "4",
        name: "모킹된 스크랩 항목 4",
        link: "https://example.com/scrap4",
        tags: ["Storybook", "Testing"],
      },
      {
        id: "5",
        name: "모킹된 스크랩 항목 5",
        link: "https://example.com/scrap5",
        tags: ["Storybook", "Testing"],
      },
    ]);
  }),
];
