import React, { FC } from "react";
import Lottie from "lottie-react";
import circularLoaderAnimation from "@/assets/animations/circularLoader.json";

const CircularLoader: FC<{
  height: number;
  width: number;
  loading: boolean;
}> = ({ height, width, loading }) => {
  return (
    <div className="w-full flex items-center justify-center p-[20px]">
      {" "}
      <Lottie
        animationData={circularLoaderAnimation}
        loop={true}
        className={`h-[${height}px] w-[${width}px] ${
          loading ? "block" : "hidden"
        }`}
      />
    </div>
  );
};

export default CircularLoader;
