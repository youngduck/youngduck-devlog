"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import rehypeRaw from "rehype-raw";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

type MarkdownPostProps = {
  postContent: string;
};

const MarkdownPost: React.FC<MarkdownPostProps> = ({ postContent }) => {
  return (
    <ReactMarkdown
      key={1}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children, ...props }) => (
          <h1 className="text-green-500" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children }) => <h2 className="text-4xl my-8">{children}</h2>,
        blockquote: ({ children }) => <div className="p-4">{children}</div>,
        img: ({ src, alt }) => (
          <Image src={src || ""} alt={alt || ""} width={500} height={100} />
        ),

        // code: ({ children }) => (
        //   <pre className="bg-gray-100 p-8 leading-6 my-8 mx-auto">
        //     <code>{children}</code>
        //   </pre>
        // ),
        // code(props) {
        //   const { children, className, node, ...rest } = props;
        //   const match = /language-(\w+)/.exec(className || "");
        //   if (match) {
        //     console.log(match[1], "??");
        //   }

        //   return (
        //     <SyntaxHighlighter PreTag="div" language="js" style={dracula}>
        //       {String(children).replace(/\n$/, "")}
        //     </SyntaxHighlighter>
        //   );
        // },

        code: ({ children }) => (
          <SyntaxHighlighter PreTag="div" language="js" style={dracula}>
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ),
      }}
    >
      {postContent}
    </ReactMarkdown>
  );
};

export default MarkdownPost;
