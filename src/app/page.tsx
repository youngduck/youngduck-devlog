import { PaginationDemo } from "./_components/layout/pagination";
import { getAllPosts } from "@/lib/api";
import PostCard from "./_components/post/post-card";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="lg:w-[1150px] mx-auto">
      <div className="flex">
        <div className="flex lg:w-[960px] border-y flex-wrap lg:justify-normal justify-center">
          {/* <div className="w-full h-[450px]">빔</div> */}
          {posts.map((item, idx) => (
            <PostCard
              key={idx}
              slug={item.slug}
              title={item.title}
              coverImage={item.coverImage}
              date={item.date}
              excerpt={item.excerpt}
              category={item.category}
            />
          ))}
        </div>
        <aside className="hidden lg:block sticky">
          <ul className="sticky top-[50px]">
            <li>아하</li>
          </ul>
        </aside>
      </div>
      <PaginationDemo />
    </main>
  );
}
