"use client";
import AuthSkeleton from "@/package/SkeletonLoaders/AuthSkeleton";
import dynamic from "next/dynamic";
import React from "react";

const Children = dynamic(() => import("@/components/Children/Children"), {
  loading: () => <AuthSkeleton />,
  ssr: false,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-bg center-div max-sm:block">
      <div className="custom-card  z-[1] relative max-h-[90vh] overflow-y-auto scrollbar-custom max-sm:h-full max-sm:max-h-full">
        <Children childData={children} />
      </div>
    </div>
  );
};

export default Layout;
