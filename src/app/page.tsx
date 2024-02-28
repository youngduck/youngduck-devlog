import { getAllPosts } from "../lib/api";
import Markdown from "react-markdown";

export default function Home() {
  const allPosts = getAllPosts();
  console.log(allPosts[0].tag);

  const markdown = "# HI, *pluto*!";
  const abc = allPosts[0].content;

  return (
    <main className="">
      <Markdown>{allPosts[0].tag[1]}</Markdown>
      <Markdown>{markdown}</Markdown>
    </main>
  );
}
