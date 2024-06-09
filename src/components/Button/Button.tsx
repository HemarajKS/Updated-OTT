import React, { ReactElement } from "react";
import { Button as MUIButton } from "@mui/material";
import { ButtonComponentType } from "@/interfaces/interfaces";
import DotLoader from "../DotLoader/DotLoader";

const Button = ({
  name,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  ghost = false,
}: ButtonComponentType): ReactElement => {
  return (
    <MUIButton
      type={type}
      variant={ghost ? "outlined" : "contained"}
      className={`w-full  !text-sm !p-small rounded-sm !normal-case h-[48px] relative overflow-hidden ${
        ghost
          ? "border-dodger-blue !text-dodger-blue"
          : "!bg-dodger-blue !text-white"
      }`}
      disableElevation
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <DotLoader /> : name}
    </MUIButton>
  );
};

export default Button;
