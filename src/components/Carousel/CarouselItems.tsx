"use client";

import { responsive } from "@/assets/constants/constants";
import React from "react";
import Carousel from "react-multi-carousel";
import CarouselCard from "../CarouselCard/CarouselCard";
import { CarouselItemsProps, Content } from "@/interfaces/interfaces";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper/modules";

const CarouselItems = ({ movieData }: CarouselItemsProps) => {
  return (
    <>
      {/* <Carousel responsive={responsive}>
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
      </Carousel> */}

      <Swiper
        // slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
        breakpoints={responsive}
        className="w-full !overflow-y-visible !overflow-x-clip !px-[20px] custom-swiper-styles !z-0"
      >
        {movieData &&
          movieData.length > 0 &&
          movieData.map((curElem: Content, i: number) => {
            return (
              <SwiperSlide
                key={i}
                className={`${
                  i !== movieData.length - 1 && "mr-[20px]"
                } absolute`}
              >
                <CarouselCard key={curElem?.id} actualData={curElem} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default CarouselItems;
