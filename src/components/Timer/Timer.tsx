import { calculateTimeDiff } from "@/utils/calculateTimeDiff";
import React, { useState, useEffect, FC } from "react";

const Timer: FC<{ targetDate: Date; onTimerEnd?: () => void }> = ({
  targetDate,
  onTimerEnd,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    minutes: string;
    seconds: string;
  }>({
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    setTimeLeft(calculateTimeDiff(targetDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeDiff(targetDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.minutes === "00" &&
        newTimeLeft.seconds === "00" &&
        onTimerEnd
      ) {
        onTimerEnd();
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="w-[50px]">
      <div className="text-white">{`${timeLeft.minutes}:${timeLeft.seconds}`}</div>
    </div>
  );
};

export default Timer;
