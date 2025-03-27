/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";
import { useContext } from "react";
import { FunnelContext } from "../../funnel";

interface IStep {
  children: React.ReactNode;
  name: string;
}

const Step: React.FC<IStep> = ({ children, name }) => {
  //SECTION HOOK호출 영역
  const { step } = useContext(FunnelContext);

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  if (step === name) {
    return <>{children}</>;
  }

  return null;
};

export default Step;
