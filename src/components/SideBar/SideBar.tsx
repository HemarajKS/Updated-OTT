"use client";
import React, { useState } from "react";
import Link from "next/link";

const SideBar = ({ menuData }: any) => {
  return (
    <div className="fixed bg-dark-grey text-light-grey-1 flex flex-col inset-0 top-[64px] z-[99999]">
      {menuData.length > 0 &&
        menuData.map((item: any, index: number) => (
          <div key={index} className="py-[10px] px-[20px] cursor-pointer">
            {item.title}

            <div className="flex flex-col">
              {item.children.length > 0 &&
                item.children.map((option: any, index: number) => (
                  <Link
                    href={
                      !option.function
                        ? (item?.url || "") + (option?.url || "")
                        : ""
                    }
                    onClick={() => {
                      if (option?.function) {
                        option.function();
                      }
                    }}
                    key={index}
                    className="px-[20px] py-[5px] hover:text-white text-sm"
                  >
                    {option.title}
                  </Link>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SideBar;
