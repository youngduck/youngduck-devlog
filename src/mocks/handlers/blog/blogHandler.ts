import { http, HttpResponse } from "msw";
import dummy from "./dummy.json";

export const blogHandlers = [
  // 게시물 관련 핸들러
  http.get("http://localhost:3000/api/blog", () => {
    return HttpResponse.json(dummy);
  }),
];
