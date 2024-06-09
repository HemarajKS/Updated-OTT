import React, { FC, FormEvent, useState } from "react";
import strings from "@/assets/strings/strings.json";
import Link from "next/link";
import { frontendRoutes } from "@/assets/constants/frontend-routes";
import InputComponent from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { SignupEmail } from "@/interfaces/interfaces";
import { validateInput } from "@/utils/validation";
import { apiEndpoints } from "@/assets/constants/api-endpoints";
import {
  apiConstants,
  apiMethods,
  constants,
} from "@/assets/constants/constants";
import { useSnackbar } from "@/contexts/snackbar-context/snackbar-context";
import { setRoutePermissions } from "@/utils/route-permissions";
import { useRouter } from "next/navigation";
import { request } from "@/services/api";
import { cookieStorageAPI } from "@/services/storages";

const EmailSignup: FC = () => {
  const [errorFields, setErrorFields] = useState<SignupEmail>({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState<SignupEmail>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { openSnackbar } = useSnackbar();

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let hasError = false;

    Object.keys(formData).forEach((key: string) => {
      const errorMessage = validateInput(
        key as keyof SignupEmail,
        formData[key as keyof SignupEmail],
        key as keyof SignupEmail
      );

      if (!formData[key as keyof SignupEmail] || errorMessage) {
        if (!hasError) {
          hasError = true;
        }
      }

      setErrorFields((prev: SignupEmail) => ({
        ...prev,
        [key]: errorMessage,
      }));
    });

    if (!hasError) {
      const data = { destination: formData.email, channel: apiConstants.EMAIL };
      setLoading(true);
      request(apiEndpoints.sendOTP, apiMethods.POST, {}, data)
        .then((data: any) => {
          if (data.resultInfo.code === constants.SUCCCESS) {
            let currentTime = new Date();

            const otpData = {
              type: apiConstants.EMAIL,
              destination: formData.email,
              targetTimeStamp: new Date(
                new Date(currentTime.getTime() + 30 * 1000)
              ), //after 30 seconds
              password: formData.password,
            };
            cookieStorageAPI.set("otpData", otpData);
            setRoutePermissions(frontendRoutes.SIGN_UP_OTP);
            router.push(frontendRoutes.SIGN_UP_OTP);
          }
        })
        .catch((error) => {
          openSnackbar(error.message, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onInputChange = (
    data: Partial<SignupEmail>,
    hasError: string
  ): void => {
    setFormData((prevState: SignupEmail) => ({
      ...prevState,
      ...data,
    }));

    const key = Object.keys(data)[0];

    setErrorFields((prev: SignupEmail) => ({
      ...prev,
      [key]: hasError,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex justify-between gap-3 pt-[40px] opacity-70 items-center w-full">
        <div className="text-sm font-semibold">{strings.email}</div>
        <Link href={frontendRoutes.SIGN_UP} className="text-xs font-normal">
          {strings.signUpWithPhoneNumber}
        </Link>
      </div>
      <div className="pt-[8px]">
        <InputComponent
          placeholder={strings.email}
          name={"email"}
          onChange={onInputChange}
          validationRequired
          validationType="email"
          error={errorFields.email}
        />
      </div>
      <div className="pt-[16px]">
        <InputComponent
          placeholder={strings.password}
          name={"password"}
          onChange={onInputChange}
          validationRequired
          validationType="password"
          error={errorFields.password}
          type="password"
        />
      </div>
      <div className="w-full mt-[24px]">
        <Button name={strings.continue} type="submit" loading={loading} />
      </div>
    </form>
  );
};

export default EmailSignup;
