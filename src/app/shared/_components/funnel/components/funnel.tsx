/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";
import { createContext } from "react";
import Step from "./step/components/step";

export const FunnelContext = createContext<{
  step: string;
}>({
  step: "",
});

interface Ifunnel {
  children: React.ReactNode;
  step: string;
}

const Funnel: React.FC<Ifunnel> = ({ children, step }) => {
  //SECTION HOOK호출 영역

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <FunnelContext.Provider value={{ step }}>{children}</FunnelContext.Provider>
  );
};

export default Object.assign(Funnel, { Step });
