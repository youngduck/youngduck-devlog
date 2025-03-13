/**
 * 작성자: KYD
 * 기능: 모바일화면에서는 메뉴를 토글로 관리
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React from "react";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

interface IListButton {
  onClick: () => void;
}

const ListButton: React.FC<IListButton> = ({ onClick }) => {
  return (
    <Button
      variant="link"
      size="icon"
      className="mr-2 border-2 border-yellow bg-background sm:flex md:hidden"
      onClick={onClick}
    >
      <List className="text-yellow" />
    </Button>
  );
};

export default ListButton;
