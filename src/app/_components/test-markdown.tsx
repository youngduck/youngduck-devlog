"use client";
import Markdown from "react-markdown";
import raw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownViewProps {
  post: string;
}

const MarkdownView = ({ post }: MarkdownViewProps) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[raw]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              {...props}
              style={dracula}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {post}
    </Markdown>
  );
};

export default MarkdownView;
