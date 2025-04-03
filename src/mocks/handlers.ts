import { http, HttpResponse } from "msw";
import { handler } from "./handlers/index";
export const handlers = [...handler];
