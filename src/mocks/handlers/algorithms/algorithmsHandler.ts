import { http, HttpResponse } from "msw";
import dummy from "./dummy.json";

export const algorithmsHandlers = [
  // 게시물 관련 핸들러
  http.get("*/api/algorithms*", () => {
    return HttpResponse.json(dummy);
  }),
];
