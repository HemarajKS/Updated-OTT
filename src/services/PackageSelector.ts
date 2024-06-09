import dynamic from "next/dynamic";

const Rails = dynamic(() => import("@/package/Rails/Rails"));
const Hero = dynamic(() => import("@/package/Hero/Hero"));
const FAQ = dynamic(() => import("@/package/FAQ/FAQ"));
const Banner = dynamic(() => import("@/package/Banner/Banner"));

function getComponent(key: string) {
  switch (key) {
    case "Rails":
      return Rails;
    case "FAQ":
      return FAQ;
    case "Hero":
      return Hero;
    case "Banner":
      return Banner;
    default:
      throw new Error(`Unknown component key: ${key}`);
  }
}

export default getComponent;
