export const getSongDurStr = (ms: number): string => {
  const totalSec = Math.trunc(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;

  return String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
};
