import React, { FC, ReactElement, useState } from "react";
import strings from "@/assets/strings/strings.json";
import Image from "next/image";
import { loginOptions } from "@/assets/constants/constants";
import DownArrowIcon from "@/assets/icons/down-arrow.svg";

const MoreOptions: FC = () => {
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  const renderShowMoreOptions = (): ReactElement => {
    return (
      <div
        className="flex items-center mt-[30px] gap-[4px]"
        onClick={() => setShowMoreOptions(true)}
      >
        <span className="text-sm text-dodger-blue cursor-pointer">
          {strings.moreLoginOptions}
        </span>{" "}
        <span>
          <Image src={DownArrowIcon} alt="" />
        </span>
      </div>
    );
  };

  const renderMoreOptions = (): ReactElement => {
    return (
      <div className="mt-[30px] flex flex-col gap-[40px] w-full transition-all">
        <div className="flex items-center">
          <div className="bg-tundora w-full h-[1px]"></div>
          <div className="px-[20%] text-wild-sand text-xxs">or</div>
          <div className="bg-tundora w-full h-[1px]"></div>
        </div>
        <div className="flex flex-col gap-[16px]">
          {loginOptions.map((item, i) => {
            return (
              <div
                key={i}
                className="bg-tundora flex cursor-pointer rounded-normal p-small"
              >
                <Image
                  src={item.icon}
                  alt=""
                  height={0}
                  width={0}
                  style={{ width: "22px", height: "auto" }}
                />
                <div className="flex-grow text-center pr-[22px]  max-sm:text-xs">
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return <>{showMoreOptions ? renderMoreOptions() : renderShowMoreOptions()}</>;
};

export default MoreOptions;
