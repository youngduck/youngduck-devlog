import { getAllCategoriesID, getAllPosts, getFilteredPosts } from "@/lib/api";
import TagNavbar from "@layout/tag-navbar";
import PostCards from "../_components/post/post-cards/post-cards";
interface Params {
  params: {
    slug: string;
  };
}

const page: React.FC<Params> = ({ params }) => {
  const posts = getAllPosts();

  return (
    <main className="w-full lg:w-[1200px] h-auto mx-auto">
      <div className="flex flex-col justify-center items-center">
        <TagNavbar />
        <PostCards posts={posts} />
      </div>
    </main>
  );
};

export default page;
