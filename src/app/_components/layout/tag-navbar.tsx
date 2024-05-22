import Link from "next/link";
import { getAllCategoriesArray } from "@/lib/api";

const TagNavbar = async () => {
  const categories = await getAllCategoriesArray();

  return (
    <nav className="block lg:w-[960px] w-full my-[30px] p-3 border-y-2 font-[Seonbi]">
      <ul className="flex flex-wrap">
        {categories.map((item: [string, number], idx: number) => (
          <Link
            key={idx}
            href={item[0] === "All Posts" ? "/" : `/category/${item[0]}`}
          >
            <li className="mx-2 font-bold italic">
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
