import { lottieData } from "@/app/shared/_components/lottie/lottieData";
import CustomLottie from "@/app/shared/_components/lottie/CustomLottie";

const NotFound = () => {
  return (
    <main className="mx-auto h-auto md:max-w-container-md lg:max-w-container-lg">
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
