"use client";
import { frontendRoutes } from "@/assets/constants/frontend-routes";
import Link from "next/link";

import notFoundAnimation from "@/assets/animations/not-found.json";
import Lottie from "lottie-react";

export default function NotFound() {
  return (
    <div>
      <Lottie
        animationData={notFoundAnimation}
        loop={true}
        className="h-full"
      />
      <Link href={frontendRoutes.DASHBOARD}>Return Homen</Link>
    </div>
  );
}
