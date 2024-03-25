import { Button } from "../../../components/ui/button";
import RssFeedIcon from "../../../../public/assets/svg/rssFeedIcon.svg";

const RssFeedButton = () => {
  return (
    <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
      <Button
        variant="link"
        size="icon"
        className="border-yellow border-2 mr-2"
      >
        <RssFeedIcon width={20} height={20} />
      </Button>
    </a>
  );
};

export default RssFeedButton;
