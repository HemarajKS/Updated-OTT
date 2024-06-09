import React, { FC } from "react";
import dynamic from "next/dynamic";
import strings from "@/assets/strings/strings.json";
import AuthSkeleton from "@/package/SkeletonLoaders/AuthSkeleton";

const OtpForm = dynamic(() => import("@/package/Auth/OtpForm/OtpForm"), {
  loading: () => <AuthSkeleton />,
  ssr: false,
});

export const metadata = {
  title: strings.RoboOTTOTPVerification,
};

const OtpPage: FC = () => {
  return (
    <div className="flex flex-col text-white items-center">
      <OtpForm />
    </div>
  );
};
export default OtpPage;
