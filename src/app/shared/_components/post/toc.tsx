"use client";

import { useEffect, useState } from "react";

const Toc = () => {
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(
      document.querySelectorAll("h2, h3"),
    );
    setHeadingEls(headingElements);
  }, []);

  return (
    <nav className="hidden transform animate-fade-up font-[KCC] duration-500 lg:block">
      <ul className="sticky top-[160px] w-[274px] border-l-2 pl-[10px]">
        <p className="text-[24px] font-bold">ON THIS PAGE</p>
        {headingEls?.map((heading, index) => {
          return (
            <li
              key={`heading-${index}`}
              className={`${
                heading.tagName === "H3"
                  ? "ml-6 text-[14px]"
                  : "text-[16px] font-semibold"
              } my-2`}
            >
              <a href={"#" + heading.id}>{heading.innerText}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Toc;
