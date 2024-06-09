import Accordion from "@/components/Accordion";
import Title from "@/components/Title/Title";
import { FAQProps } from "@/interfaces/interfaces";
import React, { FC } from "react";

const FAQ: React.FC<FAQProps> = ({ data, title }) => {
  return (
    <div className=" flex flex-col gap-[20px] p-[40px] relative">
      {/* <div className="text-center">
        <Title title={title} />
      </div>

      <Accordion contents={data.contents} /> */}
    </div>
  );
};

export default FAQ;
