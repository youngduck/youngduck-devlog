import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { Post } from "@/interfaces/posts";

type MarkdownPostProps = {
  post: Post;
};

const MarkdownPost: React.FC<MarkdownPostProps> = ({ post }) => {
  return (
    <Markdown
      key={1}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children, ...props }) => (
          <h1 className="text-green-500" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children }) => <h2 className="text-4xl my-8">{children}</h2>,
        blockquote: ({ children }) => <div className="p-4">{children}</div>,
        img: ({ src, alt }) => (
          <Image src={src || ""} alt={alt || ""} width={200} height={100} />
        ),
        code: ({ children }) => (
          <pre className="bg-gray-100 p-8 leading-6 my-8 mx-auto">
            <code>{children}</code>
          </pre>
        ),
      }}
    >
      {post.content}
    </Markdown>
  );
};

export default MarkdownPost;
