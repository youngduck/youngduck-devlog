import React from "react";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CMS_NAME } from "../../../lib/constants";
import PostTitle from "@/app/_components/post/post-title";
import PostBody from "@/app/_components/post/post-body";
interface Params {
  params: {
    slug: string;
  };
}

const Page: React.FC<Params> = async ({ params }) => {
  const post = getPostBySlug(params.slug);
  const { title, category, date, content } = post;
  if (!post) {
    return notFound();
  }

  return (
    <main className="lg:w-[1150px] mx-auto flex px-2">
      <article className="w-[960px]">
        <PostTitle title={title} category={category} date={date} />
        <PostBody content={content} />
      </article>
      <nav className="hidden lg:block">
        <ul className="sticky top-[50px]">
          <li>
            <a href="#section-1">Section 1</a>
          </li>
          <li>
            <a href="#section-2">Section 2</a>
          </li>
          <li>
            <a href="#section-3">Section 3</a>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${CMS_NAME}`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASED_URL as string),
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default Page;
