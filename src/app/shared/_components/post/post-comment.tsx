"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Giscus = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const loadGiscus = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "youngduck/youngduck-devlog");
    script.setAttribute("data-repo-id", "R_kgDOLZSYnQ");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOLZSYnc4Cdwhe");
    script.setAttribute(
      "data-theme",
      resolvedTheme === "light" ? "light" : "dark",
    );
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.async = true;

    const comments = document.getElementById("giscusComments");
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById("giscusComments");
      if (comments) comments.innerHTML = "";
    };
  }, [resolvedTheme]);

  useEffect(() => {
    loadGiscus();
  }, [loadGiscus]);

  return <section id="giscusComments" className="my-[50px] lg:w-[760px]" />;
};

export default Giscus;
