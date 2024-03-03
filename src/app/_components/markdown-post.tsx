import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts } from "@/lib/api";
import Image from "next/image";
import { Post } from "@/interfaces/posts";

type markdownPostType = {
  post: Post;
};
const MarkdownPost: React.FC<markdownPostType> = ({ post }) => {
  return (
    <Markdown
      key={1}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="text-green-500">{children}</h1>,
        h2: ({ children }) => <h2 className="text-blue-500">{children}</h2>,
        blockquote: ({ children }) => (
          <div
            style={{
              padding: "2px 15px",
            }}
          >
            {children}
          </div>
        ),
        img: (image) => (
          <Image
            src={image.src || ""}
            alt={image.alt || ""}
            width={200}
            height={100}
          />
        ),
      }}
    >
      {post.content}
    </Markdown>
  );
};

export default MarkdownPost;
