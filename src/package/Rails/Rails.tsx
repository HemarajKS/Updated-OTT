import "react-multi-carousel/lib/styles.css";
import Title from "@/components/Title/Title";
import CarouselItems from "../../components/Carousel/CarouselItems";
import strings from "@/assets/strings/strings.json";
import { RailsProps } from "@/interfaces/interfaces";

const Rails = ({ data, title }: RailsProps) => {
  return (
    <div className=" flex flex-col gap-[20px] carousel-custom  relative p-[40px]">
      <Title title={title || strings.movies} />
      <CarouselItems movieData={data} />
    </div>
  );
};

export default Rails;
