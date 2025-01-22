import React from "react";

const BoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-md bg-gradient-to-r from-yellow to-[#8C6306] p-[3px]">
      <div className="flex h-full w-full p-2 bg-background back">
        {children}
      </div>
    </div>
  );
};

export default BoxWrapper;
