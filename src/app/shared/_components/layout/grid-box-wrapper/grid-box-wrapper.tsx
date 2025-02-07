import React from "react";

interface GridBoxWrapperProps {
  children: React.ReactNode;
  className: string;
  title?: string;
}

const GridBoxWrapper: React.FC<GridBoxWrapperProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <section
      className={`h-full w-full transform animate-fade-up rounded-md border-2 bg-secondary p-2 ${className}`}
    >
      <div className="flex justify-between">
        <div>{title}</div>
        <div></div>
      </div>
      {children}
    </section>
    // <div
    //   className={`rounded-[6px] bg-gradient-to-r from-yellow to-[#8C6306] p-1 w-full ${className}`}
    // >
    //   <div className="flex h-full w-full p-2 bg-secondary">{children}</div>
    // </div>
  );
};

export default GridBoxWrapper;
