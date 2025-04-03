import { scrapHandlers } from "./scrap-item/scrap";
import { blogHandlers } from "./blog/blogHandler";
import { algorithmsHandlers } from "./algorithms/algorithmsHandler";

export const handler = [
  ...scrapHandlers,
  ...blogHandlers,
  ...algorithmsHandlers,
];
