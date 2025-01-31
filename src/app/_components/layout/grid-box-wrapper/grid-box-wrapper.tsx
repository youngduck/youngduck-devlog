import React from "react";

interface GridBoxWrapperProps {
  children: React.ReactNode;
  className: string;
}

const GridBoxWrapper: React.FC<GridBoxWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`flex h-full w-full p-2 bg-secondary border-2 rounded-md ${className}`}
    >
      {children}
    </div>
    // <div
    //   className={`rounded-[6px] bg-gradient-to-r from-yellow to-[#8C6306] p-1 w-full ${className}`}
    // >
    //   <div className="flex h-full w-full p-2 bg-secondary">{children}</div>
    // </div>
  );
};

export default GridBoxWrapper;
