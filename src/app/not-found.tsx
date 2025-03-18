import dynamic from "next/dynamic";
import { lottieData } from "@/app/shared/_components/lottie/lottieData";

const CustomLottie = dynamic(
  () => import("@/app/shared/_components/lottie/CustomLottie"),
  { ssr: false },
);

const NotFound = () => {
  return (
    <main className="md:max-w-container-md lg:max-w-container-lg mx-auto h-auto">
      <div className="flex flex-col items-center justify-center border-b-2">
        <h1 className="font-[KCC] text-[40px] text-purple-500">
          존재 하지 않는 페이지 입니다.
        </h1>
        <CustomLottie animationData={lottieData.notFound} />
      </div>
    </main>
  );
};

export default NotFound;
