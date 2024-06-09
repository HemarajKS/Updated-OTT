import { debounce } from "@/utils/debounce";
import { useState, useEffect } from "react";

type Breakpoint = "xl" | "lg" | "md" | "sm" | "default";

const getActiveBreakpoint = (): Breakpoint => {
  if (window?.matchMedia("(min-width: 1280px)").matches) {
    return "xl";
  } else if (window?.matchMedia("(min-width: 1024px)").matches) {
    return "lg";
  } else if (window?.matchMedia("(min-width: 768px)").matches) {
    return "md";
  } else if (window?.matchMedia("(min-width: 640px)").matches) {
    return "sm";
  } else {
    return "default";
  }
};

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getActiveBreakpoint());
    };

    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
