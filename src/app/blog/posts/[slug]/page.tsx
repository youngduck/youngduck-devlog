import React from "react";
import { getPostBySlug, getAllPosts } from "@/app/api/blog/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CMS_NAME } from "../../../../lib/constants";
import PostTitle from "@/app/shared/_components/post/post-title";
import PostBody from "@/app/shared/_components/post/post-body/post-body";
import PostToc from "@/app/shared/_components/post/post-toc/post-toc";
import Giscus from "@/app/shared/_components/post/post-comment";

type Params = Promise<{ slug: string }>;

const Page = async (props: { params: Params }) => {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) {
    return notFound();
  }
  const { title, category, date, coverImage, content } = post;

  return (
    <>
      <main className="lg:w-container-lg mx-auto flex w-full px-2">
        <article className="w-full lg:w-[860px] lg:pr-[100px]">
          <PostTitle
            title={title}
            category={category}
            date={date}
            coverImage={coverImage}
          />
          <PostBody content={content} />
        </article>
        <PostToc />
      </main>
      <Giscus />
    </>
  );
};

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${CMS_NAME}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: { name: "youngduck" },
    generator: "Next.js",
    creator: "youngduck",
    publisher: "Vercel",
    keywords: post.category,
    verification: { google: "lybtoBCBf6isHIGdGbYxTHG7N2dUanHjWahiXMgKtXY" },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASED_URL as string),
    openGraph: {
      url: `https://youngduck-devlog.vercel.app/posts/${post.slug}`,
      siteName: "youngduck-devlog",
      title,
      description: post.excerpt,
      images: [post.ogImage.url],
      locale: "ko_KR",
      type: "article",
      authors: "kimyoungduck",
      publishedTime: post.date,
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
