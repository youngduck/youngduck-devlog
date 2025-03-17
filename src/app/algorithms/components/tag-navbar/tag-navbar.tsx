import Link from "next/link";
import { getAllCategoriesArray } from "@/app/api/algorithms/api";

const TagNavbar = async () => {
  const categories = await getAllCategoriesArray();

  return (
    <nav className="my-[30px] block w-full transform animate-fade-up border-y-2 p-3 font-[KCC] duration-500 md:w-[870px] lg:w-[1200px]">
      <ul className="flex flex-wrap">
        {categories.map((item: [string, number], idx: number) => (
          <Link
            key={idx}
            href={
              item[0] === "All Algorithms"
                ? "/algorithms"
                : `/algorithms/${item[0]}`
            }
          >
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
