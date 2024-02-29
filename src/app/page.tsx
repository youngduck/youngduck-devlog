import { getAllPosts } from "../lib/api";
import Markdown from "react-markdown";
import { DarkModeToggle } from "./_components/dark-mode-toggle";

export default function Home() {
  const allPosts = getAllPosts();
  console.log(allPosts[0].tag);

  const markdown = "# HI, *pluto*!";
  const abc = allPosts[0].content;

  return (
    <main className="">
       <DarkModeToggle />
      <div className="text-lg">다크모드 테스트</div>
      <Markdown>{allPosts[0].tag[1]}</Markdown>
      <Markdown>{markdown}</Markdown>
    </main>
  );
}
