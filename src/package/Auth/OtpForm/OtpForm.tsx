"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/contexts/snackbar-context/snackbar-context";
import { request } from "@/services/api";
import OtpRead from "@/components/OtpRead/OtpRead";
import strings from "@/assets/strings/strings.json";
import { OtpObject } from "@/interfaces/interfaces";
import {
  apiConstants,
  apiMethods,
  constants,
} from "@/assets/constants/constants";
import { apiEndpoints } from "@/assets/constants/api-endpoints";
import { frontendRoutes } from "@/assets/constants/frontend-routes";
import { useAuth } from "@/contexts/auth-context/authContext";
import dynamic from "next/dynamic";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import { cookieStorageAPI } from "@/services/storages";

const Timer = dynamic(() => import("@/components/Timer/Timer"), {
  loading: () => <SkeletonLoader width="200px" height="20px" />,
  ssr: false,
});

const OtpForm: FC = () => {
  const [otpData, setOtpData] = useState<OtpObject>({
    type: "",
    destination: "",
    targetTimeStamp: new Date(),
    password: "",
  });

  const [showTimer, setShowTimer] = useState(false);

  const [loading, setLoading] = useState(false);

  const [timerEnded, setTimerEnded] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const data = cookieStorageAPI.get("otpData");
    if (data as OtpObject) {
      setOtpData(data as OtpObject);
    }
  }, []);

  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  const onOtpSubmit = (otp: string): void => {
    const submitData =
      otpData.type === apiConstants.EMAIL
        ? {
            mode: apiConstants.PASSWORD,
            email: otpData.destination,
            otp: otp,
            password: otpData.password,
          }
        : {
            mode: apiConstants.OTP,
            mobileNumber: otpData.destination,
            otp: otp,
          };

    setLoading(true);
    request(
      otpData.type === apiConstants.EMAIL
        ? apiEndpoints.register
        : apiEndpoints.otpLogin,
      apiMethods.POST,
      {},
      submitData
    )
      .then((data: any) => {
        if (data.resultInfo.code === constants.SUCCCESS) {
          if (otpData.type === apiConstants.SMS) {
            cookieStorageAPI.remove("otpData");
            login(
              data?.data?.tokenInfo?.token,
              data?.data?.tokenInfo?.refreshToken,
              "phone"
            );
          } else {
            cookieStorageAPI.set("email", otpData.destination);
            cookieStorageAPI.remove("otpData");
            router.push(`${frontendRoutes.LOGIN}?email=true`);
            openSnackbar(strings.signUpSuccess, "success");
          }
        }
      })
      .catch((error) => {
        openSnackbar(error.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onChange = (data: any) => {
    if (data.otp.length === constants.OTP_LENGTH) {
      onOtpSubmit(data.otp);
    }
  };

  const resendOtp = () => {
    const data = {
      destination: otpData.destination,
      channel:
        otpData.type === apiConstants.EMAIL
          ? apiConstants.EMAIL
          : apiConstants.SMS,
    };
    request(apiEndpoints.sendOTP, apiMethods.POST, {}, data)
      .then((data: any) => {
        if (data.resultInfo.code === constants.SUCCCESS) {
          let currentTime = new Date();

          const newOtpData = {
            type:
              otpData.type === apiConstants.EMAIL
                ? apiConstants.EMAIL
                : apiConstants.SMS,
            destination: otpData.destination,
            targetTimeStamp: new Date(
              new Date(currentTime.getTime() + 30 * 1000)
            ), //after 30 seconds
          };
          setOtpData(newOtpData as OtpObject);
          setTimerEnded(false);
          cookieStorageAPI.set("otpData", newOtpData);
        }
      })
      .catch((error) => {
        openSnackbar(error.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="text-lg font-bold max-sm:text-24">{strings.signUp}</div>
      <div className="font-medium text-[20px] leading-tight mt-[40px]">
        {strings.verification}
      </div>
      <div className="text-sm pt-[10px]  text-light-grey-1 text-center">
        {strings.codeSentMessage} {otpData?.destination || ""}
      </div>

      <form className="w-card-container max-sm:w-full">
        <OtpRead onChange={onChange} />
      </form>

      <div
        className="mt-[100px] flex gap-[4px] text-gray max-sm:mt-[26px]"
        key={String(otpData.targetTimeStamp)}
      >
        {timerEnded ? (
          <div className="text-white cursor-pointer" onClick={resendOtp}>
            {strings.resendOtpText}
          </div>
        ) : (
          <>
            {strings.resendOtp}{" "}
            <Timer
              targetDate={otpData.targetTimeStamp}
              onTimerEnd={handleTimerEnd}
            />
          </>
        )}
      </div>
    </>
  );
};

export default OtpForm;
