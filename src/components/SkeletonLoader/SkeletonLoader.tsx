"use client";
import { Skeleton } from "@mui/material";
import React, { FC } from "react";
import tailwindConfig from "../../../tailwind.config";
import { SkeletonLoaderInterface } from "@/interfaces/interfaces";

const SkeletonLoader: FC<SkeletonLoaderInterface> = ({
  width = "100px",
  height = "100px",
  variant = "rectangular",
  className,
}) => {
  return (
    <div className={className}>
      <div className={"animate-pulse"}>
        <div
          style={{
            background:
              // @ts-ignore
              tailwindConfig?.theme?.extend?.colors["transparent-white"] || "",
            height: height,
            width: width,
            borderRadius: { circular: 999999, rectangular: 0, rounded: 6 }[
              variant
            ],
          }}
        ></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
