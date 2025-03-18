import Link from "next/link";
import { getAllCategoriesArray } from "@/lib/api";

const TagNavbar = async () => {
  const categories = await getAllCategoriesArray();

  const getNavigateUrl = (category: string) => {
    return category === "All Posts" ? "/blog" : `/blog/${category}`;
  };

  return (
    <nav className="md:w-container-md lg:w-container-lg my-[30px] block w-full transform animate-fade-up border-y-2 p-3 font-[KCC] duration-500">
      <ul className="flex flex-wrap">
        {categories.map((item: [string, number], idx: number) => (
          <Link key={idx} href={getNavigateUrl(item[0])}>
            <li className="mx-2 font-bold italic pcHover:hover:scale-105">
              <span className="text-xl"># {item[0]}</span>
              <span className="text-xs">({item[1]})</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default TagNavbar;
