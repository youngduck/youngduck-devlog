import { Button } from "@/app/shared/_components/layout/button/button";
import RssFeedIcon from "@public/assets/svg/rssFeedIcon.svg";

const RssFeedButton = () => {
  return (
    <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
      <Button
        variant="link"
        size="icon"
        className="mr-2 border-2 border-yellow bg-background sm:hidden md:flex"
      >
        <RssFeedIcon width={20} height={20} />
      </Button>
    </a>
  );
};

export default RssFeedButton;
