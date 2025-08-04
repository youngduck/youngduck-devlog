import { http, HttpResponse } from "msw";
import postDummy from "./postDummy.json";
import monthlyStatsData from "./monthlyStatDummy.json";

export const algorithmsHandlers = [
  // 통계 API 핸들러
  http.get("*/api/algorithms/stats", () => {
    return HttpResponse.json(monthlyStatsData);
  }),

  // 게시물 관련 핸들러
  http.get("*/api/algorithms", () => {
    return HttpResponse.json(postDummy);
  }),
];
