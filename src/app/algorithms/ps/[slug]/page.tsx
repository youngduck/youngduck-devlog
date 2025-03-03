/**
 * 작성자: KYD
 * 기능: 알고리즘 풀이 상세 페이지 SERVER SIDE 렌더링
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React from "react";
import { notFound } from "next/navigation";
import { CMS_NAME } from "@/lib/constants";
import PostTitle from "@/app/shared/_components/post/post-title";
import PostBody from "@/app/shared/_components/post/post-body/post-body";
import Toc from "@/app/shared/_components/post/toc";
import Giscus from "@/app/shared/_components/post/post-comment";
import { Metadata } from "next";
import { getAllAlgorithms, getPostBySlug } from "@/app/api/algorithms/api";

interface Params {
  params: {
    slug: string;
  };
}

const page: React.FC<Params> = ({ params }) => {
  //SECTION HOOK호출 영역
  const post = getPostBySlug(params.slug);
  const { title, category, date, coverImage, content } = post;
  if (!post) {
    return notFound();
  }
  //!SECTION HOOK호출 영역

  return (
    <>
      <main className="mx-auto flex w-full px-2 lg:w-[1200px]">
        <article className="w-full lg:w-[860px] lg:pr-[100px]">
          <PostTitle
            title={title}
            category={category}
            date={date}
            coverImage={coverImage}
          />
          <PostBody content={content} />
        </article>
        <Toc />
      </main>
      <Giscus />
    </>
  );
};

export function generateMetadata({ params }: Params): Metadata {
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
      url: `https://youngduck-devlog.vercel.app/algorithms/ps/${post.slug}`,
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
  const algorithms = getAllAlgorithms();

  return algorithms.map((algorithm) => ({
    slug: algorithm.slug,
  }));
}

export default page;
