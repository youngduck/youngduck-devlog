"use client";

import { useEffect, useState } from "react";

const PostToc = () => {
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(
      document.querySelectorAll("h2, h3"),
    );
    setHeadingEls(headingElements);

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // 화면 상단에 가장 먼저 보이는 heading을 찾음
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            (a.target as HTMLElement).offsetTop -
            (b.target as HTMLElement).offsetTop,
        );
      // eslint-disable-next-line no-console
      console.log(visibleHeadings, "visibleHeadings");
      if (visibleHeadings.length > 0) {
        setActiveId((visibleHeadings[0].target as HTMLElement).id);
      }
    };

    const observer = new window.IntersectionObserver(handleIntersect, {
      rootMargin: "0px 0px -70% 0px", // 상단에서 30% 지점에 걸리면 active
      threshold: 0.1,
    });

    headingElements.forEach((el) => {
      if (el.id) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="hidden transform animate-fade-up font-[KCC] duration-500 lg:block">
      <ul className="sticky top-[160px] w-[274px] border-l-2 pl-[10px]">
        <p className="text-[24px] font-bold">ON THIS PAGE</p>
        {headingEls?.map((heading, index) => {
          const isActive = heading.id === activeId;
          return (
            <li
              key={`heading-${index}`}
              className={`${
                heading.tagName === "H3"
                  ? "my-2 ml-6 text-[14px] leading-[18px]"
                  : "my-4 text-[16px] font-semibold leading-[20px]"
              } ${isActive ? "text-yellow" : ""}`}
            >
              <a href={"#" + heading.id}>{heading.innerText}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PostToc;
