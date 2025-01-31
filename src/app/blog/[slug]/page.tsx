import { getAllCategoriesID, getFilteredPosts } from "@/lib/api";
import TagNavbar from "@layout/tag-navbar";
import PostCard from "@/app/_components/post/post-card/post-card";
interface Params {
  params: {
    slug: string;
  };
}

const page: React.FC<Params> = ({ params }) => {
  const filteredData = getFilteredPosts(params.slug);

  return (
    <main className="lg:w-[1200px] mx-auto">
      <div className="flex flex-col justify-center items-center">
        <TagNavbar />
        <div className="flex lg:w-[1200px] flex-wrap lg:justify-normal justify-center border-b-2 pb-6">
          {filteredData.map((item, idx) => (
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
};

export const generateStaticParams = async () => {
  const categoryIDs = getAllCategoriesID();

  return categoryIDs.map((categoryID) => ({
    slug: categoryID,
  }));
};

export default page;
