import { getAllPosts } from "@/lib/api";
import PostCard from "./_components/post/post-card";
import TagNavbar from "./_components/layout/tag-navbar";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="lg:w-[1150px] h-auto mx-auto">
      <div className="flex flex-col justify-center items-center">
        <TagNavbar />
        <div className="flex lg:w-[960px] flex-wrap lg:justify-normal justify-center border-b-2 pb-6">
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
      </div>
    </main>
  );
}
