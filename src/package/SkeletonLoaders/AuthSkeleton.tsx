import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import React from "react";

const AuthSkeleton = () => {
  return (
    <div className="w-card-container flex flex-col items-center mx-auto max-sm:w-full">
      <SkeletonLoader
        width="100px"
        height="40px"
        variant="rounded"
        className="pb-[40px]"
      />
      <SkeletonLoader
        width="100%"
        height="56px"
        variant="rounded"
        className="w-full pb-[24px]"
      />
      <SkeletonLoader
        width="100%"
        height="56px"
        variant="rounded"
        className="w-full pb-[24px]"
      />
      <SkeletonLoader
        width="100%"
        height="56px"
        variant="rounded"
        className="w-full pb-[24px]"
      />
      <SkeletonLoader
        width="100%"
        height="30px"
        variant="rounded"
        className="w-full pt-[50px] pb-[24px] "
      />
    </div>
  );
};

export default AuthSkeleton;
