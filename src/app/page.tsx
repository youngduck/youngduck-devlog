import { PaginationDemo } from "./_components/layout/pagination";
import { getAllPosts, getAllCategories, getFilteredPosts } from "@/lib/api";
import PostCard from "./_components/post/post-card";

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  getFilteredPosts();

  return (
    <main className="lg:w-[1150px] mx-auto">
      <div className="flex flex-col justify-center items-center">
        <nav className="block lg:w-[960px] w-full p-7">
          <ul className="flex">
            {categories.map((item: any, idx: number) => (
              <li key={idx} className="mx-2">
                <span>{item[0]}</span>
                <span>({item[1]})</span>
              </li>
            ))}
          </ul>
        </nav>
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
