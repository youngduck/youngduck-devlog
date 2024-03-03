import { PaginationDemo } from "./_components/pagination";
import { getAllPosts } from "@/lib/api";
import PostCard from "./_components/post-card";

export default function Home() {
  const posts = getAllPosts();

  console.log(posts);

  return (
    <main className="lg:w-[1150px] mx-auto">
      <div className="flex">
        <div className="flex w-[960px] flex-wrap lg:justify-normal justify-center">
          {posts.map((item, idx) => (
            <PostCard
              key={idx}
              title={item.title}
              coverImage={item.coverImage}
              date={item.date}
            />
          ))}
        </div>
        <aside className="hidden lg:block">태그검색</aside>
      </div>
      <PaginationDemo />
    </main>
  );
}
