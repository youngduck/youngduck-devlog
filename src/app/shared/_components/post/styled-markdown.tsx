"use client";
import { useState } from "react";

import Image from "next/image";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkCold,
  darcula,
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
    <p className="break-words text-lg" {...rest}>
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
    <pre className="my-3 max-w-[860px]" {...rest}>
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

  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === "dark" ? darcula : coldarkCold;

  return (
    <div className="relative">
      {match ? (
        <>
          {/* <div className="h-10 rounded-none border-b-2 border-yellow bg-black">
            {match[1]}
          </div> */}
          <SyntaxHighlighter
            language={match[1]}
            style={theme}
            PreTag="div"
            customStyle={{
              borderRadius: "none",
              margin: 0,
            }}
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
        className="absolute right-2 top-2 rounded text-white transition duration-300 hover:bg-gray-700"
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
    <figure className="my-4">
      <Image
        src={src || ""}
        alt={alt || ""}
        priority={true}
        width={0}
        height={0}
        sizes="(max-width: 760px) 100%, 760px"
        style={{ width: "100%", height: "auto", maxWidth: "760px" }}
        className="mx-auto max-h-[800px] w-full"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {alt}
        </figcaption>
      )}
    </figure>
  );
};
export const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="my-10 max-w-[860px] overflow-x-auto sm:w-full">
    <table className="w-full border-collapse bg-transparent">{children}</table>
  </div>
);

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <th className="min-w-[150px] whitespace-nowrap border-l-0 border-r-0 bg-[#282a36] py-3 text-center align-middle text-xs font-semibold uppercase text-white">
      {children}
    </th>
  );
};

export const TableRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <tr className="min-w-[150px] text-white odd:bg-gray-600 even:bg-[#282a36]">
      {children}
    </tr>
  );
};
export const TableData: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <td className="min-w-[150px] p-2 text-center">{children}</td>;
};
