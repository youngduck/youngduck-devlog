"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import * as styled from "../styled-markdown";

type MarkdownPostProps = {
  content: string;
};

const PostBody: React.FC<MarkdownPostProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      className="font-[KCC] transform duration-500 animate-fade-up"
      components={{
        p: ({ children, ...rest }) => <styled.P {...rest}>{children}</styled.P>,
        a: ({ children, ...rest }) => <styled.A {...rest}>{children}</styled.A>,
        ol: ({ children, ...rest }) => (
          <styled.Ol {...rest}>{children}</styled.Ol>
        ),
        strong: ({ children, ...rest }) => (
          <styled.Strong {...rest}>{children}</styled.Strong>
        ),
        ul: ({ children, ...rest }) => (
          <styled.Ul {...rest}>{children}</styled.Ul>
        ),
        li: ({ children, ...rest }) => (
          <styled.Li {...rest}>{children}</styled.Li>
        ),
        h2: ({ children, ...rest }) => (
          <styled.H2 {...rest}>{children}</styled.H2>
        ),
        h3: ({ children, ...rest }) => (
          <styled.H3 {...rest}>{children}</styled.H3>
        ),
        blockquote: ({ children, ...rest }) => (
          <styled.Blockquote {...rest}>{children}</styled.Blockquote>
        ),
        img: ({ src, alt }) => (
          <styled.MarkdownImage src={src as string} alt={alt as string} />
        ),
        code: ({ children, className }) => (
          <styled.Code className={className}>{children}</styled.Code>
        ),
        pre: ({ children, ...rest }) => (
          <styled.Pre {...rest}>{children}</styled.Pre>
        ),
        table: ({ children, ...rest }) => (
          <styled.Table {...rest}>{children}</styled.Table>
        ),
        th: ({ children, ...rest }) => (
          <styled.TableHeader {...rest}>{children}</styled.TableHeader>
        ),
        tr: ({ children, ...rest }) => (
          <styled.TableRow {...rest}>{children}</styled.TableRow>
        ),
        td: ({ children, ...rest }) => (
          <styled.TableData {...rest}>{children}</styled.TableData>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default PostBody;
