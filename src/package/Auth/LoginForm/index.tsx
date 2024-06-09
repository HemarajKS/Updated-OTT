"use client";

import React, { FC } from "react";
import { useSearchParams } from "next/navigation";
import { constants } from "@/assets/constants/constants";
import strings from "@/assets/strings/strings.json";
import EmailLogin from "./EmailLogin";
import PhoneLogin from "./PhoneLogin";
import MoreOptions from "../MoreOptions";
import { frontendRoutes } from "@/assets/constants/frontend-routes";
import Link from "next/link";

const LoginForm: FC = () => {
  const searchParams = useSearchParams();
  const loginWithEmail = searchParams.get("email");

  return (
    <>
      <div className="text-lg font-bold max-sm:text-24">{strings.login}</div>
      <div className="flex flex-col items-center w-card-container max-sm:w-full">
        {loginWithEmail === constants.TRUE ? <EmailLogin /> : <PhoneLogin />}
        <MoreOptions />
      </div>
      <div className="mt-[100px] text-sm flex-grow max-sm:mt-[30px] max-sm:flex max-sm:items-end max-sm:pb-[16px] max-sm:gap-[4px]">
        <span className="opacity-70">{strings.dontHaveAccount}</span>{" "}
        <Link href={frontendRoutes.SIGN_UP} className="font-thick">
          {strings.signUp}
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
