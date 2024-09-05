export const getSongDurStr = (ss: number): string => {
  // const totalSec = Math.trunc(ms / 1000);
  const min = Math.floor(ss / 60);
  const sec = ss % 60;

  return String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
};
