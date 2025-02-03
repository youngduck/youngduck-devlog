/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React from "react";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

interface IListButton {}

const ListButton: React.FC<IListButton> = () => {
  //SECTION HOOK호출 영역

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <Button
      variant="link"
      size="icon"
      className="mr-2 border-2 border-yellow bg-background"
    >
      <List className="text-yellow" />
    </Button>
  );
};

export default ListButton;
