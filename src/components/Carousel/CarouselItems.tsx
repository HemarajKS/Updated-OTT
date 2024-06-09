"use client";

import { responsive } from "@/assets/constants/constants";
import React from "react";
import Carousel from "react-multi-carousel";
import CarouselCard from "../CarouselCard/CarouselCard";
import { CarouselItemsProps, Content } from "@/interfaces/interfaces";

const CarouselItems = ({ movieData }: CarouselItemsProps) => {
  return (
    <Carousel responsive={responsive}>
      {movieData &&
        movieData.length > 0 &&
        movieData.map((curElem: Content, i: number) => {
          return (
            <div
              key={i}
              className={`${i !== movieData.length - 1 && "mr-[20px]"}`}
            >
              <CarouselCard key={curElem?.id} actualData={curElem} />
            </div>
          );
        })}
    </Carousel>
  );
};

export default CarouselItems;
