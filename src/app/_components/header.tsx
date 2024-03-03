import { DarkModeToggle } from "./dark-mode-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-300 sticky pt-[32px] top-[-32px] z-10 w-full">
      <div className="flex lg:w-[1150px] mx-auto justify-between p-2">
        <Link href="/">
          <p>김영덕 - Tech Blog</p>
        </Link>
        <div>
          <div></div>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
