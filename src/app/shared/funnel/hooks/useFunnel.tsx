/**
 * 작성자: KYD
 * 기능: Funnel 훅
 * 1. mode=loop: 순환하는 Funnel
 * 2. mode=non-loop: 순환하지 않는 Funnel
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import { useState } from "react";

interface IUseFunnelProps {
  steps: string[];
  mode: "loop" | "non-loop";
}

const useFunnel = ({ steps, mode }: IUseFunnelProps) => {
  const limitStepLevels = {
    min: 0,
    max: steps.length - 1,
  };
  const [stepLevel, setStepLevel] = useState(limitStepLevels.min);

  const nextStep = () => {
    switch (mode) {
      case "loop":
        if (stepLevel < limitStepLevels.max) {
          setStepLevel((prev) => prev + 1);
        } else {
          setStepLevel(limitStepLevels.min);
        }
        break;
      case "non-loop":
        if (stepLevel < limitStepLevels.max) {
          setStepLevel((prev) => prev + 1);
        }
        break;
      default:
        break;
    }
  };

  const prevStep = () => {
    switch (mode) {
      case "loop":
        if (stepLevel > limitStepLevels.min) {
          setStepLevel((prev) => prev - 1);
        } else {
          setStepLevel(limitStepLevels.max);
        }
        break;
      case "non-loop":
        setStepLevel((prev) => prev - 1);
        break;
      default:
        break;
    }
  };

  return { step: steps[stepLevel], nextStep, prevStep };
};

export default useFunnel;
