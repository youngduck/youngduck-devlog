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
      <ul className="sticky top-[250px]">
        {headingEls?.map((heading, index) => {
          return (
            <li key={`heading-${index}`}>
              <a href={"#" + heading.id}>{heading.innerText}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Toc;
