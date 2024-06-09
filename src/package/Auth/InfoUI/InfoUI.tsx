import strings from "@/assets/strings/strings.json";
import MailIcon from "@/assets/icons/mail.svg";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { FC } from "react";

const InfoUI: FC<{ param: string }> = ({ param }) => {
  return (
    <div className="flex flex-col text-white items-center">
      <Image src={MailIcon} alt="" className="mb-[40px]" />
      <div className="text-lg font-bold max-sm:text-24">
        {strings.checkYourEmail}
      </div>
      <div className="text-sm pt-[10px]  text-center">
        {strings.codeSentMessage} {param} {strings.infoToSetPassword}
      </div>
      <div className="w-full mt-[40px]">
        <Button name={strings.resendEmail} type="button" ghost />
      </div>
    </div>
  );
};

export default InfoUI;
