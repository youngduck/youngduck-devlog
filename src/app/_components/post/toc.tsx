"use client";

import { useEffect, useState } from "react";

const Toc = () => {
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(
      document.querySelectorAll("h2, h3")
    );
    setHeadingEls(headingElements);
  }, []);

  return (
    <nav className="hidden lg:block font-[KCC] transform duration-500 animate-fade">
      <ul className="w-[274px] sticky top-[160px] border-l-2 pl-[10px]">
        <p className="font-bold text-[24px]">ON THIS PAGE</p>
        {headingEls?.map((heading, index) => {
          return (
            <li
              key={`heading-${index}`}
              className={`${
                heading.tagName === "H3"
                  ? "ml-6 text-[14px]"
                  : "font-semibold text-[16px]"
              }  my-2`}
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
