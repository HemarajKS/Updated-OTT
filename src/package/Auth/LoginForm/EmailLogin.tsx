import React, { FC, FormEvent, useState } from "react";
import Link from "next/link";
import { frontendRoutes } from "@/assets/constants/frontend-routes";
import strings from "@/assets/strings/strings.json";
import InputComponent from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { validateInput } from "@/utils/validation";
import { LoginWithEmail } from "@/interfaces/interfaces";
import { apiEndpoints } from "@/assets/constants/api-endpoints";
import { apiMethods, constants } from "@/assets/constants/constants";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/contexts/snackbar-context/snackbar-context";
import { request } from "@/services/api";
import { useAuth } from "@/contexts/auth-context/authContext";
import { getUpdatedParams } from "@/utils/getUpdatedParams";
import { cookieStorageAPI } from "@/services/storages";

const EmailLogin: FC = () => {
  const [errorFields, setErrorFields] = useState<LoginWithEmail>({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState<LoginWithEmail>({
    email: cookieStorageAPI.get("email") || "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const { openSnackbar } = useSnackbar();

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let hasError = false;

    Object.keys(formData).forEach((key: string) => {
      const errorMessage = validateInput(
        key,
        formData[key as keyof LoginWithEmail],
        key === "password" ? "" : (key as keyof LoginWithEmail)
      );

      if (!formData[key as keyof LoginWithEmail] || errorMessage) {
        if (!hasError) {
          hasError = true;
        }
      }

      setErrorFields((prev: LoginWithEmail) => ({
        ...prev,
        [key]: errorMessage,
      }));
    });

    if (!hasError) {
      const data = { userName: formData.email, password: formData.password };
      setLoading(true);
      request(apiEndpoints.emailLogin, apiMethods.POST, {}, data)
        .then((data: any) => {
          if (data.resultInfo.code === constants.SUCCCESS) {
            cookieStorageAPI.remove("email");
            login(data?.data?.token, data?.data?.refreshToken, "email");
          }
        })
        .catch((error) => {
          console.log(error);
          openSnackbar(error.message, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onInputChange = (
    data: Partial<LoginWithEmail>,
    hasError: string
  ): void => {
    setFormData((prevState: LoginWithEmail) => ({
      ...prevState,
      ...data,
    }));

    const key = Object.keys(data)[0] as keyof LoginWithEmail;

    setErrorFields((prev: LoginWithEmail) => ({
      ...prev,
      [key]: hasError,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex justify-between gap-3 pt-[40px] opacity-70 items-center w-full">
        <div className="text-sm font-semibold">{strings.email}</div>
        <Link
          href={`${frontendRoutes.LOGIN}?${getUpdatedParams(false)}`}
          className="text-xs font-normal"
        >
          {strings.signInWithPhoneNumber}
        </Link>
      </div>
      <div className="pt-[8px]">
        <InputComponent
          placeholder={strings.email}
          name={"email"}
          onChange={onInputChange}
          validationRequired
          validationType="email"
          value={formData.email}
          error={errorFields.email}
        />
      </div>
      <div className="pt-medium">
        <InputComponent
          placeholder={strings.password}
          name={"password"}
          type="password"
          onChange={onInputChange}
          validationRequired
          validationType=""
          error={errorFields.password}
        />
      </div>
      <div className="w-full mt-[24px]">
        <Button name={strings.continue} type="submit" loading={loading} />
      </div>
    </form>
  );
};

export default EmailLogin;
