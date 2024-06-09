"use client";
import React, { FC } from "react";
import AccordionComponent from "./AccordionComponent";
import { FAQDataProps } from "@/interfaces/interfaces";

const Accordion: FC<FAQDataProps> = ({ contents }) => {
  return (
    <>
      {contents.map((item: any, i: number) => {
        return (
          <div key={i}>
            <AccordionComponent
              title={item.accordionTitle}
              content={item.accordionDescription}
            />
          </div>
        );
      })}
    </>
  );
};

export default Accordion;
