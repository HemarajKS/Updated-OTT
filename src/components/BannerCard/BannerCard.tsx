import Image from "next/image";
import React, { useState } from "react";
import PlayIcon from "@/assets/icons/play.svg";
import Link from "next/link";

const BannerCard = ({ item }: any) => {
  const [error, setError] = useState(false);

  const src = item.poster;
  return (
    <div className="relative">
      <Image
        src={
          error
            ? "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=740&t=st=1714637808~exp=1714638408~hmac=565aff2bd3609247db95a239bf7f4b2530fe714e77b8c8854fb2ea1199facc20"
            : src
        }
        alt={item.name}
        loader={() => src}
        width={500}
        height={300}
        onError={() => setError(true)}
        className="object-cover w-full max-h-[82vh] object-right-top"
        unoptimized
      />
      <div className="absolute inset-0 bg-right-to-left"></div>
      <div className="absolute inset-0 right-[50%] flex flex-col  justify-center items-center gap-[12px]">
        <div className="text-white text-6xl font-600  text-clip line-clamp-1 pl-[40px] opacity-80">
          {item.name}
        </div>
        <div className="text-white text-2xl text-clip line-clamp-1 pl-[40px] opacity-80 font-thin">
          {item.genre}
        </div>
        <Link
          href={
            {
              Movie: `/movies/${item.id}`,
              TVSeries: `/tv-shows/${item.id}`,
            }[item.type as keyof { Movie: string; TVSeries: string }] || "/"
          }
        >
          <Image
            src={PlayIcon}
            alt="Play"
            className="h-[100px] cursor-pointer w-fit hover:scale-110 ease-in transition-all"
          />
        </Link>
      </div>
    </div>
  );
};

export default BannerCard;
