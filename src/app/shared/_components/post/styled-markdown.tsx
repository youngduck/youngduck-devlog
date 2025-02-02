"use client";
import { useMemo, useState } from "react";

import Image from "next/image";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkCold,
  a11yDark,
  atomDark,
  pojoaque,
  oneDark,
  oneLight,
  xonokai,
  coy,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import Clipboard from "@public/assets/svg/clipboard.svg";
import CheckIcon from "@public/assets/svg/CheckIcon.svg";
import Bulb from "@public/assets/svg/Bulb.svg";
import { useTheme } from "next-themes";
export const Blockquote: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <blockquote
      className="my-2 flex max-w-[860px] items-center gap-4 rounded-lg border-2 border-yellow p-4"
      {...rest}
    >
      <Bulb width={30} height={30} />
      <div className="flex-1">{children}</div>
    </blockquote>
  );
};

export const P: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <p className="my-2 break-words text-lg" {...rest}>
      {children}
    </p>
  );
};

export const A: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <a className="text-yellow" {...rest} target="_blank">
      {children}
    </a>
  );
};

export const Ol: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <ol className="list-decimal px-8" {...rest}>
      {children}
    </ol>
  );
};

export const Pre: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <pre
      className="my-3 max-w-[860px] rounded-lg border-2 border-yellow"
      {...rest}
    >
      {children}
    </pre>
  );
};

export const Strong: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <strong className="text-yellow" {...rest}>
      {children}
    </strong>
  );
};

export const Ul: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <ul className="list-disc px-8" {...rest}>
      {children}
    </ul>
  );
};

export const Li: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <li className="" {...rest}>
      {children}
    </li>
  );
};

export const H2: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <h2 className="my-4 block pt-[60px] text-3xl font-bold" {...rest}>
      {children}
    </h2>
  );
};
export const H3: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <h3 className="my-4 pt-[60px] text-2xl font-bold" {...rest}>
      {children}
    </h3>
  );
};

export const Code: React.FC<{ children: React.ReactNode; className: any }> = ({
  children,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 300);
  };

  return (
    <div className="relative">
      {match ? (
        <>
          <SyntaxHighlighter
            className="mb-[150px] transition duration-300 hover:cursor-pointer"
            language={match[1]}
            customStyle={{
              margin: "0px",
              backgroundColor: "blue",
            }}
            style={pojoaque}
            PreTag="div"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </>
      ) : (
        <>
          <code className={className}>{children}</code>
        </>
      )}

      <button
        className="absolute right-0 top-0 rounded px-2 py-1 text-white transition duration-300 hover:bg-gray-700"
        onClick={copyToClipboard}
      >
        {copied ? (
          <CheckIcon width={20} height={20} />
        ) : (
          <Clipboard width={20} height={20} />
        )}
      </button>
    </div>
  );
};

export const MarkdownImage: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  return (
    <Image
      src={src || ""}
      alt={alt || ""}
      priority={true}
      width={860}
      height={0}
      className="my-4 h-auto max-h-[1000px] w-full object-cover"
    />
  );
};
export const Table: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <table className="my-10 w-full border-collapse items-center bg-transparent">
      {children}
    </table>
  );
};

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <th className="whitespace-nowrap border-l-0 border-r-0 bg-[#282a36] py-3 text-center align-middle text-xs font-semibold uppercase text-white">
      {children}
    </th>
  );
};

export const TableRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <tr className="text-white odd:bg-gray-600 even:bg-[#282a36]">{children}</tr>
  );
};
export const TableData: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <td className="p-2 text-center">{children}</td>;
};
