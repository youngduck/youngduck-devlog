import { DarkModeToggle } from "./dark-mode-toggle";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RssFeedButton from "./rss-feed-button";

const Header = () => {
  return (
    <header className="sticky pt-[20px] top-[-20px] z-10 w-full bg-background transform animate-fade-down">
      <div className="flex lg:w-[1150px] h-[55px] mx-auto justify-between p-2">
        <Link href="/">
          <div className="relative w-[200px] h-[50px]">
            <Image
              src="/assets/logo/logo.png"
              alt="/assets/logo/logo.png"
              fill
              priority={true}
              sizes="(max-width:192px)"
              className="object-cover"
            />
          </div>
        </Link>
        <div className="flex">
          <RssFeedButton />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
