import { getAllPosts } from "../lib/api";
import Markdown from "react-markdown";
import { PaginationDemo } from "./_components/pagination";

export default function Home() {
  const allPosts = getAllPosts();

  const markdown =
    "# HI, *pluto*! ## ㅋㅋ ![img](/assets/blog/authors/youngduck.png)";

  return (
    <main className="">
      {/* {allPosts.map((item) => (
        <Markdown key={item.slug}>{item.title}</Markdown>
      ))} */}

      <Markdown
        key={1234}
        components={{
          h1: ({ children }) => <h1 className="text-red-500">{children}</h1>,
        }}
      >
        {markdown}
      </Markdown>

      <PaginationDemo />
    </main>
  );
}
