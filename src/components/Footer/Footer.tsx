import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ data }: any) => {
  const src = `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.logo.formats.small.url}`;
  return (
    <div className="bg-black text-white py-8 flex items-center flex-col gap-[12px] pt-[150px]">
      <div>
        <Image
          unoptimized
          src={src}
          alt={data.logo.url}
          width={0}
          height={0}
          className="w-auto max-h-[72px]"
        />{" "}
      </div>
      <div className="flex justify-center text-blue-500  gap-[20px]">
        {data.links.map((item: any, i: number) => (
          <Link href={item.link} key={i}>
            {item.name}
          </Link>
        ))}
      </div>
      <div className="text-gray-500">{data?.copyright?.text}</div>
    </div>
  );
};

export default Footer;
