import InputComponent from "@/components/Input/Input";
import React, { FC, FormEvent, useEffect, useState } from "react";
import strings from "@/assets/strings/strings.json";
import Button from "@/components/Button/Button";
import { ValidatePassword, validateInput } from "@/utils/validation";
import PasswordValidation from "./PasswordValidation";
import { newPasswordValidations } from "@/assets/constants/input-validation";
import { NewPassword, ValidationRules } from "@/interfaces/interfaces";

const PasswordForm: FC = () => {
  const [formData, setFormData] = useState<NewPassword>({
    password: "",
    confirmPassword: "",
  });

  const [errorFields, setErrorFields] = useState<NewPassword>({
    password: "",
    confirmPassword: "",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    let hasError = false;

    Object.keys(formData).forEach((key: string) => {
      const errorMessage = validateInput(
        key as keyof NewPassword,
        formData[key as keyof NewPassword],
        key as keyof NewPassword
      );

      setErrorFields((prev: NewPassword) => ({
        ...prev,
        [key]: errorMessage,
      }));

      if (key === "confirmPassword") {
        if (formData.password !== formData[key]) {
          setErrorFields((prev: NewPassword) => ({
            ...prev,
            [key]: strings.passwordsMustBeSame,
          }));

          if (!hasError) {
            hasError = true;
          }
        }
      } else if (key === "password") {
        const passwordCriteria: ValidationRules = ValidatePassword(
          formData[key as keyof NewPassword]
        );
        const message =
          Object.values(passwordCriteria).find((criterion) => !criterion.valid)
            ?.message || "";

        if (formData[key as keyof NewPassword]) {
          setErrorFields((prev: NewPassword) => ({
            ...prev,
            [key]: `${message}`,
          }));
        }

        if (message) {
          if (!hasError) {
            hasError = true;
          }
        }
      }

      if (!formData[key as keyof NewPassword] || errorMessage) {
        if (!hasError) {
          hasError = true;
        }
      }
    });

    if (!hasError) {
      alert("Can be submitted");
    }
  };

  const onInputChange = (data: any, hasError: string): void => {
    setFormData((prevState: NewPassword) => ({
      ...prevState,
      ...data,
    }));

    const key = Object.keys(data)[0];

    setErrorFields((prev: NewPassword) => ({
      ...prev,
      [key]: hasError,
    }));

    if (key === "password") {
      const passwordCriteria: ValidationRules = ValidatePassword(data[key]);
      const message =
        Object.values(passwordCriteria).find((criterion) => !criterion.valid)
          ?.message || "";

      setErrorFields((prev: NewPassword) => ({
        ...prev,
        [key]: `${message}`,
      }));
    } else if (key === "confirmPassword") {
      if (formData.password !== data[key]) {
        setErrorFields((prev) => ({
          ...prev,
          [key]: strings.passwordsMustBeSame,
        }));
      } else {
        setErrorFields((prev) => ({
          ...prev,
          [key]: "",
        }));
      }
    }
  };

  return (
    <>
      <div className="text-lg font-bold max-sm:text-24">
        {strings.createNewPassword}
      </div>
      <div className="text-sm pt-[10px]">{strings.askForthisPassword}</div>
      <div className="w-card-container max-sm:w-full">
        <form className="pt-[32px] w-full" onSubmit={onSubmit}>
          <div className="pt-medium">
            <InputComponent
              placeholder={strings.newPassword}
              name={"password"}
              type="password"
              onChange={onInputChange}
              validationRequired
              error={errorFields.password}
            />
          </div>
          <div className="pt-medium">
            <InputComponent
              placeholder={strings.reEnterPassword}
              name={"confirmPassword"}
              type="password"
              onChange={onInputChange}
              validationRequired
              error={errorFields.confirmPassword}
            />
          </div>
          <div className="w-full mt-[24px]">
            <Button name={strings.continue} type="submit" />
          </div>
        </form>
        <PasswordValidation passwordValidation={newPasswordValidations} />
      </div>
    </>
  );
};

export default PasswordForm;
