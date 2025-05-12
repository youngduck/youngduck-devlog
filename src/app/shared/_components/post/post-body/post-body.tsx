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
  // 단락을 처리하는 컴포넌트: 이미지가 있으면 div, 없으면 p로 렌더링
  const ParagraphRenderer = ({ children, ...rest }: any) => {
    const hasImage = rest.node.children[0].tagName === "img";

    if (hasImage) {
      return <div {...rest}>{children}</div>;
    }

    // 이미지가 없으면 기본 p 태그로 렌더링
    return <styled.P {...rest}>{children}</styled.P>;
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      className="transform animate-fade-up font-[KCC] duration-500"
      components={{
        p: ParagraphRenderer,
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
