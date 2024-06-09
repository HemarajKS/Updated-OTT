import { ValidationRules } from "@/interfaces/interfaces";
import React, { FC } from "react";
import strings from "@/assets/strings/strings.json";
import TickMark from "@/assets/icons/tick-mark.svg";
import Image from "next/image";

const PasswordValidation: FC<{ passwordValidation: ValidationRules }> = ({
  passwordValidation,
}) => {
  return (
    <div className="flex flex-col mt-[32px] w-full">
      <div className="text-sm font-semibold">{strings.passwordMustContain}</div>
      <div className="flex flex-col gap-[12px] pt-[12px]">
        {Object.keys(passwordValidation).map((item, index) => (
          <div key={index} className="flex gap-[5px] items-center">
            <div
              className={`w-[14px] h-[14px] rounded-full center-div ${
                passwordValidation[item].valid
                  ? "bg-christi "
                  : "bg-transparent-white"
              }`}
            >
              <Image src={TickMark} alt="" />
            </div>

            <div className="opacity-70">{passwordValidation[item].message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordValidation;
