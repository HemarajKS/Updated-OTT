"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import noDetails from "../../assets/icons/arrow-up.svg";
import details from "../../assets/icons/arrow-down.svg";
import SideBar from "../SideBar/SideBar";

const SideMenu = ({ menuData }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="relative font-sans font-semibold text-20 leading-26.4px text-light-grey-1 flex max-sm:text-18 group"
      onClick={handleToggle}
    >
      <div
        className={`relative flex h-[64px] px-[18px] items-center w-max group-hover:bg-dark-grey text-white cursor-pointer`}
      >
        <span>Menu</span>
        {menuData.length > 0 &&
          menuData.map((content: any, index: number) => (
            <div key={index} className="cursor-default">
              {content.items.length > 0 && (
                <Image
                  src={isOpen ? noDetails : details}
                  alt="details"
                  className="w-[30px]"
                />
              )}

              {content.items && content.items.length > 0 && isOpen && (
                <SideBar menuData={content.items} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SideMenu;
