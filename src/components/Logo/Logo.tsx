import React from "react";
import strings from "@/assets/strings/strings.json";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="font-sans font-semibold text-24 leading-26.4px text-white max-sm:text-20"
    >
      {strings.roboOTT}
    </Link>
  );
};

export default Logo;
