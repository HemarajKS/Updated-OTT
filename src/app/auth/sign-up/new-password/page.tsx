"use client";

import AuthSkeleton from "@/package/SkeletonLoaders/AuthSkeleton";
import dynamic from "next/dynamic";
import React, { FC } from "react";

const PasswordForm = dynamic(
  () => import("@/package/Auth/PasswordForm/index"),
  {
    loading: () => <AuthSkeleton />,
    ssr: false,
  }
);

const page: FC = () => {
  return (
    <div className="flex flex-col text-white items-center ">
      <PasswordForm />
    </div>
  );
};

export default page;
