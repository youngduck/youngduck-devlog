"use client";

import Image from "next/image";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const Blockquote: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <blockquote className="p-4 bg-slate-700 text-white my-2" {...rest}>
      {children}
    </blockquote>
  );
};

export const P: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <p className="text-lg" {...rest}>
      {children}
    </p>
  );
};

export const A: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <a className="text-[#E6B43F] underline" {...rest} target="_blank">
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
export const Strong: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <strong className="text-[#E6B43F]" {...rest}>
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

export const H2: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <h2 className="block text-4xl py-6 my-4 font-bold border-b-2" {...rest}>
      {children}
    </h2>
  );
};
export const H3: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <h3 className="text-3xl  py-3 my-3 font-bold" {...rest}>
      {children}
    </h3>
  );
};

export const Code: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <div className="w-[calc(100vw-16px)] lg:w-[960px]" {...rest}>
      <SyntaxHighlighter PreTag="div" language="js" style={dracula}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
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
      width={960}
      height={0}
      className="w-full max-h-[450px] h-auto object-cover"
    />
  );
};
