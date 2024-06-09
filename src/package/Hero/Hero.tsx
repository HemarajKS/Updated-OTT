import HeroCard from "@/components/HeroCard/HeroCard";
import { HeroDataProps } from "@/interfaces/interfaces";
import React, { FC } from "react";

const Hero: FC<{ data: HeroDataProps[] }> = ({ data }) => {
  return (
    <div>
      {" "}
      <HeroCard heroData={data} />{" "}
    </div>
  );
};

export default Hero;
