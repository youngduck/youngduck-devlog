"use client";
import { useState } from "react";

import Image from "next/image";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const Blockquote: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <blockquote
      className="p-4 bg-slate-700 text-white my-2 max-w-[860px]"
      {...rest}
    >
      {children}
    </blockquote>
  );
};

export const P: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <p className="text-lg my-2" {...rest}>
      {children}
    </p>
  );
};

export const A: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <a className="text-yellow underline" {...rest} target="_blank">
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
    <pre className="max-w-[860px]" {...rest}>
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
    <h2 className="block text-4xl pb-6 pt-[60px] my-4  font-bold" {...rest}>
      {children}
    </h2>
  );
};
export const H3: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <h3 className="text-3xl  pb-3 pt-[60px] my-4 font-bold" {...rest}>
      {children}
    </h3>
  );
};

export const Code: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 300);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter
        className="mb-[150px] hover:bg-gray-700 hover:cursor-pointer transition duration-300"
        language="javascript"
        style={dracula}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
      <button
        className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 transition duration-300"
        onClick={copyToClipboard}
      >
        {copied ? "Copied!" : "Copy"}
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
      className="w-full max-h-[1000px] h-auto my-4 object-cover"
    />
  );
};
