"use client";
import Lottie from "react-lottie-player";

interface ICustomLottie {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData: any;
}

const CustomLottie: React.FC<ICustomLottie> = ({ animationData }) => {
  return <Lottie animationData={animationData} play loop />;
};

export default CustomLottie;
