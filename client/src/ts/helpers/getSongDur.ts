export const getSongDurStr = (ms: number): string => {
  let totalSec = Math.trunc(ms / 1000);
  let min = Math.floor(totalSec / 60);
  let sec = totalSec % 60;

  return String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
};
