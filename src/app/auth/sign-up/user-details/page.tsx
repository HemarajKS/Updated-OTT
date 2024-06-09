"use client";

import AuthSkeleton from "@/package/SkeletonLoaders/AuthSkeleton";
import dynamic from "next/dynamic";
import React, { FC } from "react";

const UserDetailsForm = dynamic(
  () => import("@/package/Auth/UserDetailsForm"),
  {
    loading: () => <AuthSkeleton />,
    ssr: false,
  }
);

const UserDetails: FC = () => {
  return (
    <div className="flex flex-col text-white items-center">
      <UserDetailsForm />
    </div>
  );
};

export default UserDetails;
