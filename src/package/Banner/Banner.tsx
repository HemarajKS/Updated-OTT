import { RailsProps } from "@/interfaces/interfaces";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import BannerCard from "@/components/BannerCard/BannerCard";

const Banner = ({ data }: RailsProps) => {
  return (
    <div>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        effect={"fade"}
        navigation
        modules={[Navigation, Pagination, EffectFade]}
        className="h-full"
      >
        {data?.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <BannerCard item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
