import { getAllPosts } from "@/lib/api";
import PostCard from "./_components/post/post-card/post-card";
import TagNavbar from "@layout/tag-navbar";
import PostCards from "./_components/post/post-cards/post-cards";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="lg:w-[1150px] h-auto mx-auto">
      <div className="flex flex-col justify-center items-center">
        <TagNavbar />
        <PostCards posts={posts} />
      </div>
    </main>
  );
}
