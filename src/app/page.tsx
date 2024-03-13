import { PaginationDemo } from "./_components/layout/pagination";
import { getAllCategories, getFilteredPosts } from "@/lib/api";
import PostCard from "./_components/post/post-card";
import TagNavbar from "./_components/layout/tag-navbar";

export default function Home() {
  const categories = getAllCategories();
  const posts = getFilteredPosts();

  return (
    <main className="lg:w-[1150px] mx-auto">
      <div className="flex flex-col justify-center items-center">
        <TagNavbar categories={categories} />
        <div className="flex lg:w-[960px] flex-wrap lg:justify-normal justify-center">
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
      <PaginationDemo />
    </main>
  );
}
