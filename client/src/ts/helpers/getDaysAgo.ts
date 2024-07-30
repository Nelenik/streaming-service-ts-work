import { getWordEndigs } from "helpers";

export const getDaysAgo = (dateStr: string): string => {
  const createdDate = Math.trunc(
    (Date.now() - new Date(dateStr).getTime()) / 86400000
  );
  return `${createdDate} ${getWordEndigs(createdDate, ["день", "дня", "дней"])} ${"назад"}`;
};
