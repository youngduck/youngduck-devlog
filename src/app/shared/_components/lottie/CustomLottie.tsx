"use client";
import Lottie from "react-lottie-player";

interface ICustomLottie {
  animationData: any;
}

const CustomLottie: React.FC<ICustomLottie> = ({ animationData }) => {
  return <Lottie animationData={animationData} play loop />;
};

export default CustomLottie;
