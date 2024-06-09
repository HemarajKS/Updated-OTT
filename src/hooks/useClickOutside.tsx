import { useEffect, RefObject } from "react";

export const useClickOutside = <T extends HTMLElement>(
  refs: RefObject<T>[],
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    let isOutside = true;
    for (const ref of refs) {
      if (ref.current && ref.current.contains(event.target as Node)) {
        isOutside = false;
        break;
      }
    }
    if (isOutside) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs, callback]);
};
