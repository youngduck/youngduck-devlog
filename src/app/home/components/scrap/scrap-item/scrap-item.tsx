/**
 * 작성자: KYD
 * 기능: 홈페이지에 쓰일 스크랩 목록 (서버 컴포넌트)
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 * 아이디어: 테이블 형태, 소팅, 노션으로 링크이동?
 */
import { getAllScrapList } from "@/app/home/apis/scrap-apis";

interface IScrapItem {}

const ScrapItem: React.FC<IScrapItem> = async () => {
  //SECTION HOOK호출 영역
  const scrapList = await getAllScrapList();
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <div>
      {scrapList.map((item: any) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  );
};

export default ScrapItem;
