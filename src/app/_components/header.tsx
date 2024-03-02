import { DarkModeToggle } from "./dark-mode-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-red-300">
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
