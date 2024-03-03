import React from "react";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CMS_NAME } from "../../../lib/constants";
import MarkdownPost from "@/app/_components/markdown-post";

interface Params {
  params: {
    slug: string;
  };
}

const Page: React.FC<Params> = async ({ params }) => {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return notFound();
  }

  return (
    <main className="lg:w-[1150px] mx-auto">
      <article>
        <MarkdownPost post={post} />
      </article>
      <nav>목차</nav>
    </main>
  );
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export default Page;
