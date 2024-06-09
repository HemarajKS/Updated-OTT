"use client";
import { constants } from "@/assets/constants/constants";
import { FC, useState } from "react";
import OtpInput from "react-otp-input";

const OtpRead: FC<{ onChange: (data: { [key: string]: string }) => void }> = ({
  onChange,
}) => {
  const [otp, setOtp] = useState("");

  return (
    <div className="pt-[20px] ">
      <OtpInput
        value={otp}
        onChange={(data) => {
          setOtp(data);
          onChange({ otp: data });
        }}
        numInputs={constants.OTP_LENGTH}
        renderSeparator={<span> </span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={
          "!w-[80px] !h-[80px] bg-cod-gray rounded-[5px] border !border-gray-light focus:!border-dodger-blue focus:!outline-none max-sm:!h-[58px] max-sm:!w-[58px] max-[446px]:!h-[36px] max-[446px]:!w-[36px] "
        }
        containerStyle={"gap-[6px] justify-center max-sm:flex-wrap "}
      />
    </div>
  );
};

export default OtpRead;
