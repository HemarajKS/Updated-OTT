"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CarouselCard = ({ actualData }: any) => {
  const jawSummary = actualData;
  // const [isHovered, setIsHovered] = useState(false);

  const [error, setError] = useState(false);

  const src = jawSummary?.poster || "";

  return (
    <Link
      href={
        {
          Movie: `/movies/${jawSummary.id}`,
          TVSeries: `/tv-shows/${jawSummary.id}`,
        }[jawSummary.type as keyof { Movie: string; TVSeries: string }] || "/"
      }
      className={`backdrop-filter z-0 backdrop-blur-md bg-cover bg-center rounded-lg shadow-lg flex flex-col items-center justify-center text-center  transition-all `}
    >
      <div className="w-full relative overflow-visible ">
        <div
          className={`banner-image overflow-hidden rounded-lg border border-white border-opacity-25 z-30 `}
        >
          <Image
            src={
              error
                ? "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=740&t=st=1714637808~exp=1714638408~hmac=565aff2bd3609247db95a239bf7f4b2530fe714e77b8c8854fb2ea1199facc20"
                : src
            }
            alt={jawSummary.name}
            loader={() => src}
            width={500}
            height={300}
            onError={() => setError(true)}
            className="h-[210px] object-cover z-0 relative"
            unoptimized
          />
        </div>

        <div className="text-white uppercase text-md font-semibold mt-4 line-clamp-2 text-ellipsis">
          {jawSummary.name}
        </div>
      </div>
    </Link>
  );
};

export default CarouselCard;
