import React, { FC, FormEvent, useState } from "react";
import strings from "@/assets/strings/strings.json";
import InputComponent from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { PasswordAssistanceInterface } from "@/interfaces/interfaces";
import { validateInput } from "@/utils/validation";
import BackArrow from "@/assets/icons/arrow-left.svg";
import Image from "next/image";
import Link from "next/link";
import { frontendRoutes } from "@/assets/constants/frontend-routes";
import { useSnackbar } from "@/contexts/snackbar-context/snackbar-context";
const PasswordAssistanceForm: FC = () => {
  const [errorFields, setErrorFields] = useState<PasswordAssistanceInterface>({
    email: "",
  });

  const [formData, setFormData] = useState<PasswordAssistanceInterface>({
    email: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { openSnackbar } = useSnackbar();

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let hasError = false;

    Object.keys(formData).forEach((key: string) => {
      const errorMessage = validateInput(
        key as keyof PasswordAssistanceInterface,
        formData[key as keyof PasswordAssistanceInterface],
        key as keyof PasswordAssistanceInterface
      );

      if (!formData[key as keyof PasswordAssistanceInterface] || errorMessage) {
        if (!hasError) {
          hasError = true;
        }
      }

      setErrorFields((prev: PasswordAssistanceInterface) => ({
        ...prev,
        [key]: errorMessage,
      }));
    });

    if (!hasError) {
      setLoading(true);
    }
  };

  const onInputChange = (
    data: Partial<PasswordAssistanceInterface>,
    hasError: string
  ): void => {
    setFormData((prevState: PasswordAssistanceInterface) => ({
      ...prevState,
      ...data,
    }));

    const key = Object.keys(data)[0];

    setErrorFields((prev: PasswordAssistanceInterface) => ({
      ...prev,
      [key]: hasError,
    }));
  };

  return (
    <div className="flex flex-col text-white items-center py-[70px]">
      <Link
        href={frontendRoutes.LOGIN}
        className="float-left flex gap-[4px] absolute top-[40px] left-[40px]"
      >
        <Image src={BackArrow} alt="" />
        <span className="text-gray text-sm">{strings.back}</span>
      </Link>
      <div className="text-lg font-bold max-sm:text-24">
        {strings.passwordAssistance}
      </div>
      <div className="text-sm pt-[10px] w-card-container text-center max-sm:w-full">
        {strings.passwordAssistanceInfo}
      </div>
      <form onSubmit={onSubmit} className="mt-[40px] w-full">
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
        <div className="w-full mt-[24px]">
          <Button name={strings.continue} type="submit" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default PasswordAssistanceForm;
