import React, { FC, useEffect, useState } from "react";
import strings from "@/assets/strings/strings.json";
import InputComponent from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { validateInput } from "@/utils/validation";
import { UserDetails } from "@/interfaces/interfaces";

const UserDetailsForm: FC = () => {
  const [formData, setFormData] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    state: "",
  });
  const [errorFields, setErrorFields] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    state: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onInputChange = (
    data: Partial<UserDetails>,
    hasError: string
  ): void => {
    setFormData((prevState: UserDetails) => ({
      ...prevState,
      ...data,
    }));

    const key = Object.keys(data)[0] as keyof UserDetails;

    setErrorFields((prev: UserDetails) => ({
      ...prev,
      [key]: hasError,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    let hasError = false;
    event.preventDefault();
    Object.keys(formData).forEach((key: string) => {
      const errorMessage: string = validateInput(
        key as keyof UserDetails,
        formData[key as keyof UserDetails],
        key
      );

      if (!formData[key as keyof UserDetails] || errorMessage) {
        if (!hasError) {
          hasError = true;
        }
      }

      setErrorFields((prev: UserDetails) => ({
        ...prev,
        [key]: errorMessage,
      }));
    });

    if (!hasError) {
      alert("Can be submitted");
    }
  };

  return (
    <>
      <div className="text-lg font-bold max-sm:text-24 ">
        {strings.yourDetails}
      </div>
      <form onSubmit={onSubmit} className="w-card-container max-sm:w-full">
        <div className="pt-medium">
          <InputComponent
            placeholder={strings.firstName}
            name={"firstName"}
            onChange={onInputChange}
            validationRequired
            error={errorFields.firstName}
          />
        </div>
        <div className="pt-medium">
          <InputComponent
            placeholder={strings.lastName}
            name={"lastName"}
            onChange={onInputChange}
            validationRequired
            error={errorFields.lastName}
          />
        </div>
        <div className="pt-medium">
          <InputComponent
            placeholder={strings.email}
            name={"email"}
            onChange={onInputChange}
            validationRequired
            validationType="email"
            error={errorFields.email}
          />
        </div>
        <div className="pt-medium">
          <InputComponent
            placeholder={strings.state}
            name={"state"}
            onChange={onInputChange}
            validationRequired
            error={errorFields.state}
          />
        </div>
        <div className="w-full mt-[24px]">
          <Button name={strings.continue} type="submit" />
        </div>
      </form>
    </>
  );
};

export default UserDetailsForm;
