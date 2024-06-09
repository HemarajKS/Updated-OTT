export const calculateTimeDiff = (
  targetDate: Date
): {
  minutes: string;
  seconds: string;
} => {
  const difference = +new Date(targetDate) - +new Date();

  const totalSeconds = Math.floor(difference / 1000);
  const minutes = totalSeconds < 0 ? 0 : Math.floor(totalSeconds / 60);
  const seconds = totalSeconds < 0 ? 0 : totalSeconds % 60;

  return {
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};
