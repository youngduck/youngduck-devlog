import { getAllCategoriesID, getFilteredPosts } from "@/lib/api";
import TagNavbar from "@/app/home/components/tag-navbar/tag-navbar";
import PostCards from "@/app/shared/_components/post/post-cards/post-cards";

type Params = Promise<{ slug: string }>;

const page = async (props: { params: Params }) => {
  const params = await props.params;
  const filteredData = getFilteredPosts(params.slug);

  return (
    <main className="mx-auto h-auto w-full md:max-w-container-md lg:max-w-container-lg">
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
