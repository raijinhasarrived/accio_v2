import Lottie from "lottie-react";
import speech from "@/public/2 Speech Balloon.json";

export const LottieLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Lottie className="h-52 w-52" animationData={speech} />
    </div>
  );
};
