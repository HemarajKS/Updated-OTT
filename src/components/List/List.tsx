import Link from "next/link";
import React from "react";

const List = ({ options }: any) => {
  return (
    <div className="absolute top-full bg-dark-grey text-light-grey-1 h-max w-max right-0 min-w-[120px] flex flex-col ">
      {options?.children &&
        options.children.map((option: any, index: number) => (
          <Link
            href={
              !option.function ? (options?.url || "") + (option?.url || "") : ""
            }
            onClick={() => {
              if (option?.function) {
                option.function();
              }
            }}
            key={index}
            className="px-[20px] py-[10px] hover:bg-white hover:text-black"
          >
            {option.title}
          </Link>
        ))}
    </div>
  );
};
export default List;
