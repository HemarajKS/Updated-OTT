import React, { FC, FormEvent, useState } from "react";
import Link from "next/link";
import { frontendRoutes } from "@/assets/constants/frontend-routes";
import strings from "@/assets/strings/strings.json";
import countryCodes from "@/assets/data/country-codes.json";
import InputWithDropdown from "@/components/DropdownInput/DropdownInput";
import Button from "@/components/Button/Button";
import { validateInput } from "@/utils/validation";
import { PhoneInputLogin, PhoneLoginType } from "@/interfaces/interfaces";
import {
  apiConstants,
  apiMethods,
  constants,
} from "@/assets/constants/constants";
import { apiEndpoints } from "@/assets/constants/api-endpoints";
import { useSnackbar } from "@/contexts/snackbar-context/snackbar-context";
import { setRoutePermissions } from "@/utils/route-permissions";
import { useRouter } from "next/navigation";
import { request } from "@/services/api";
import { cookieStorageAPI } from "@/services/storages";

const PhoneSignup: FC = () => {
  const [errorFields, setErrorFields] = useState<PhoneLoginType>({
    phone: "",
  });

  const [formData, setFormData] = useState<PhoneInputLogin>({
    phone: {
      dropdownValue: "",
      inputValue: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { openSnackbar } = useSnackbar();

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let hasError = false;

    Object.keys(formData).forEach((key: string) => {
      let value: string = (
        formData[key as keyof PhoneInputLogin] as PhoneInputLogin["phone"]
      ).inputValue;

      const errorMessage = validateInput(
        key,
        value,
        key as keyof PhoneInputLogin
      );

      if (!formData[key as keyof PhoneInputLogin] || errorMessage) {
        if (!hasError) {
          hasError = true;
        }
      }

      setErrorFields((prev: PhoneLoginType) => ({
        ...prev,
        [key]: errorMessage,
      }));
    });

    if (!hasError) {
      const data = {
        destination: formData.phone.inputValue,
        channel: apiConstants.SMS,
      };
      setLoading(true);
      request(apiEndpoints.sendOTP, apiMethods.POST, {}, data)
        .then((data: any) => {
          if (data.resultInfo.code === constants.SUCCCESS) {
            let currentTime = new Date();

            const otpData = {
              type: apiConstants.SMS,
              destination: formData.phone.inputValue,
              targetTimeStamp: new Date(
                new Date(currentTime.getTime() + 30 * 1000)
              ), //after 30 seconds
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
    data: Partial<PhoneInputLogin>,
    hasError: string
  ): void => {
    setFormData((prevState: PhoneInputLogin) => ({
      ...prevState,
      ...data,
    }));

    const key = Object.keys(data)[0];

    setErrorFields((prev: PhoneLoginType) => ({
      ...prev,
      [key]: hasError,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex justify-between gap-3 pt-[40px] opacity-70 items-center w-full">
        <div className="text-sm font-semibold">{strings.phone}</div>
        <Link
          href={`${frontendRoutes.SIGN_UP}?email=true`}
          className="text-xs font-normal"
        >
          {strings.signUpWithEmail}
        </Link>
      </div>
      <div className="pt-[8px]">
        <InputWithDropdown
          dropdownArray={countryCodes}
          defaultDropdownValue={countryCodes[0].value}
          onChange={onInputChange}
          validationRequired
          validationType="phone"
          placeholderName={strings.phoneNumber}
          inputType={"number"}
          name={"phone"}
          error={errorFields?.phone}
        />
      </div>

      <div className="w-full mt-[24px]">
        <Button name={strings.continue} type="submit" loading={loading} />
      </div>
    </form>
  );
};

export default PhoneSignup;
