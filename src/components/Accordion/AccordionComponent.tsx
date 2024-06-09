"use client";
import React, { FC, useState } from "react";
import ExpandIcon from "@/assets/icons/plus.svg";
import Image from "next/image";

const AccordionComponent: FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="bg-dark-grey  z-10 relative text-white w-full hover:bg-light-grey-1 transition-all flex justify-between p-[24px] cursor-pointer overflow-hidden select-none"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="text-[18px] z-[-1]">{title}</div>
        <div
          className={`transform transition-all ${
            isActive ? "rotate-45" : "rotate-0"
          }`}
        >
          {" "}
          <Image src={ExpandIcon} alt="Expand" />
        </div>
      </div>
      {
        <div
          className={`text-white bg-dark-grey  text-[18px] mt-[1.5px] transition-all overflow-hidden relative z-0 origin-top ${
            isActive ? "opacity-100 max-h-[200px]" : "opacity-0  max-h-0"
          }`}
        >
          <div className="p-[24px] ">{content}</div>
        </div>
      }
    </div>
  );
};

export default AccordionComponent;
