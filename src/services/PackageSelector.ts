import dynamic from "next/dynamic";

const Rails = dynamic(() => import("@/package/Rails/Rails"));
const Hero = dynamic(() => import("@/package/Hero/Hero"));
const FAQ = dynamic(() => import("@/package/FAQ/FAQ"));

function getComponent(key: string) {
  switch (key) {
    case "Rails":
      return Rails;
    case "FAQ":
      return FAQ;
    case "Hero":
      return Hero;
    default:
      throw new Error(`Unknown component key: ${key}`);
  }
}

export default getComponent;
