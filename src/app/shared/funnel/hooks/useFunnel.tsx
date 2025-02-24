import { useState } from "react";

interface IUseFunnelProps {
  steps: string[];
}

const useFunnel = ({ steps }: IUseFunnelProps) => {
  const [stepLevel, setStepLevel] = useState(0);

  const nextStep = () => {
    setStepLevel((prev) => prev + 1);
  };

  const prevStep = () => {
    setStepLevel((prev) => prev - 1);
  };

  return { step: steps[stepLevel], nextStep, prevStep };
};

export default useFunnel;
