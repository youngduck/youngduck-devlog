import React from "react";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CMS_NAME } from "../../../lib/constants";
import PostTitle from "@/app/_components/post/post-title";
import PostBody from "@/app/_components/post/post-body";
import Toc from "@/app/_components/post/toc";
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
    <main className="w-full lg:w-[1150px] mx-auto flex px-2">
      <article className="w-full lg:w-[960px] lg:pr-[100px]">
        <PostTitle title={title} category={category} date={date} />
        <PostBody content={content} />
      </article>

      <Toc />
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
