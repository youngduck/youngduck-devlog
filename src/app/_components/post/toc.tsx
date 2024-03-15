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
    <nav className="hidden lg:block">
      <ul className="w-full sticky top-[250px] border-l-2 p-4">
        {headingEls?.map((heading, index) => {
          return (
            <li
              key={`heading-${index}`}
              className={heading.tagName === "H3" ? "ml-6" : ""}
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
