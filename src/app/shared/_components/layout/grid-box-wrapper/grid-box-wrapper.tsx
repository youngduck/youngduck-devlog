/**
 * 작성자: KYD
 * 기능:  1. 그리드 박스 레이아웃에 쓰일 레이아웃 컴포넌트 (헤더+컨텐츠)
 * 기능:  2. title,option 존재시 헤더 레이아웃 존재
 * 기능:  3. 컨텐츠 레이아웃 존재
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 * 아이디어: Tailwind overiding 적용
 * TODO: TW-MACRO 전환
 */

interface GridBoxWrapperProps {
  children: React.ReactNode;
  className: string;
  title?: string;
  option?: React.ReactNode;
}

const GridBoxWrapper: React.FC<GridBoxWrapperProps> = ({
  children,
  className,
  title,
  option,
}) => {
  const titleHeight = title ? "30px" : "0px";
  return (
    <section
      className={`h-full w-full rounded-md border-[3px] bg-secondary p-2 ${className}`}
    >
      {title && (
        <div
          className={`flex w-full items-center justify-between`}
          style={{
            height: titleHeight,
          }}
        >
          <div className="text-xl font-bold">{title}</div>
          <div>{option}</div>
        </div>
      )}
      <div
        className={`w-full overflow-y-auto`}
        style={{
          height: `calc(100% - ${titleHeight})`,
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default GridBoxWrapper;
