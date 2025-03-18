import { getAllCategoriesID, getFilteredPosts } from "@/lib/api";
import TagNavbar from "@/app/home/components/tag-navbar/tag-navbar";
import PostCards from "@/app/shared/_components/post/post-cards/post-cards";
interface Params {
  params: {
    slug: string;
  };
}

const page: React.FC<Params> = ({ params }) => {
  const filteredData = getFilteredPosts(params.slug);

  return (
    <main className="md:max-w-container-md lg:max-w-container-lg mx-auto h-auto w-full">
      <div className="flex flex-col items-center justify-center">
        <TagNavbar />
        <PostCards posts={filteredData} domain="blog" />
      </div>
    </main>
  );
};

export const generateStaticParams = async () => {
  const categoryIDs = getAllCategoriesID();

  return categoryIDs.map((categoryID) => ({
    slug: categoryID,
  }));
};

export default page;
