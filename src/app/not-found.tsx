import CustomLottie from "@/app/_components/lottie/CustomLottie";
import { lottieData } from "@/app/_components/lottie/lottieData";

const NotFound = () => {
  return (
    <main className="lg:w-[1150px] h-auto mx-auto ">
      <div className="flex flex-col justify-center items-center border-b-2">
        <h1 className="text-[40px] font-[KCC] text-purple-500">
          존재 하지 않는 페이지 입니다.
        </h1>
        <CustomLottie animationData={lottieData.notFound} />
      </div>
    </main>
  );
};

export default NotFound;
